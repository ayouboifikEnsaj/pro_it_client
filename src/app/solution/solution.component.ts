import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {Solution} from "../models/model/model.module";
import {SolutionService} from "../services/solution.service";
import {SolutionDialogComponent} from "../solution-dialog/solution-dialog.component";

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.css'
})
export class SolutionComponent {

  solutions!: any;
  public dataSource! : any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private solutionService: SolutionService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadSolutions();
  }

  loadSolutions() {
    this.solutionService.getAllSolutions().subscribe(data => {
      this.solutions = data;
      this.dataSource = new MatTableDataSource(this.solutions);
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialog(solution?: Solution): void {
    const dialogRef = this.dialog.open(SolutionDialogComponent, {
      width: '250px',
      data: solution ? { ...solution } : { id: null, libelle: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.solutionService.updateProbleme(result).subscribe(() => this.loadSolutions());
        } else {
          this.solutionService.createProbleme(result).subscribe(() => this.loadSolutions());
        }
      }
    });
  }

  deleteSolution(solution:Solution): void {
    this.solutionService.deleteProbleme(solution).subscribe(() => this.loadSolutions());
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
