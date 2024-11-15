import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {ZoneService} from "../services/zone.service";
import {FormBuilder} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AeroportService} from "../services/aeroport.service";
import {MatTableDataSource} from "@angular/material/table";
import {ZoneDialogComponent} from "../zone-dialog/zone-dialog.component";
import {AeroportDialogComponent} from "../aeroport-dialog/aeroport-dialog.component";

@Component({
  selector: 'app-aeroport',
  templateUrl: './aeroport.component.html',
  styleUrl: './aeroport.component.css'
})
export class AeroportComponent implements OnInit{
  displayedColumns: string[] = ['id','aeroportName','action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public dataSource! : any;
  public aeroports!:any;
  constructor(private dialog:MatDialog,
              private aeroportService:AeroportService,
              private fb:FormBuilder,
              private cdr: ChangeDetectorRef,
              private snackBar: MatSnackBar) {
  }
  ngOnInit(): void {
    this.fetchAeroports();
  }
  fetchAeroports(){
    this.aeroportService.getAllAeroports().subscribe({
      next: data => {
        console.log('Data received: ', data);
        this.aeroports = data;
        this.dataSource = new MatTableDataSource(this.aeroports);
        this.dataSource.paginator = this.paginator;
        this.cdr.detectChanges();
      },
      error: err => {
        console.log(err);
      }
    });

  }
  openDialog(aeroport?: any): void {
    const dialogRef = this.dialog.open(AeroportDialogComponent, {
      data: {
        title: aeroport ? 'Update Airport' : 'New Airport',
        aeroport: aeroport || {}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchAeroports();
      }
    });
  }
  deleteAeroport(aeroport: any): void {
    if (confirm(`Do you really want to delete this Airport? ${aeroport.aeroportName}?`)) {
      this.aeroportService.deleteAeroport(aeroport).subscribe({
        next: () => {
          this.snackBar.open('Airport deleted', 'Close', {
            duration: 3000,
          });
          this.fetchAeroports();
        },
        error: err => {
          console.log('Error deleting Aeroport:', err);
        }
      });
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
