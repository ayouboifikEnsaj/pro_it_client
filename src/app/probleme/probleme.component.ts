import {Component, ViewChild} from '@angular/core';
import {Probleme} from "../models/model/model.module";
import {ProblemeService} from "../services/probleme.service";
import {MatDialog} from "@angular/material/dialog";
import {ProblemeDialogComponent} from "../probleme-dialog/probleme-dialog.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-probleme',
  templateUrl: './probleme.component.html',
  styleUrl: './probleme.component.css'
})
export class ProblemeComponent {

  problemes!: any;
  public dataSource! : any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private problemeService: ProblemeService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadProblemes();
  }

  loadProblemes() {
    this.problemeService.getAllProblemes().subscribe(data => {
      this.problemes = data;
      this.dataSource = new MatTableDataSource(this.problemes);
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialog(probleme?: Probleme): void {
    const dialogRef = this.dialog.open(ProblemeDialogComponent, {
      width: '250px',
      data: probleme ? { ...probleme } : { id: null, libelle: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.problemeService.updateProbleme(result).subscribe(() => this.loadProblemes());
        } else {
          this.problemeService.createProbleme(result).subscribe(() => this.loadProblemes());
        }
      }
    });
  }

  deleteProbleme(probleme:Probleme): void {
    this.problemeService.deleteProbleme(probleme).subscribe(() => this.loadProblemes());
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
