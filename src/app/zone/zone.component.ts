import {ChangeDetectorRef, Component, inject, model, OnInit, signal, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ZoneDialogComponent} from "../zone-dialog/zone-dialog.component";
import {ZoneService} from "../services/zone.service";
import {Zone} from "../models/model/model.module";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrl: './zone.component.css'
})
export class ZoneComponent implements OnInit{
  displayedColumns: string[] = ['id', 'zoneName', 'action'];
  public dataSource! : any;
  public zones!:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private dialog:MatDialog,
              private zoneService:ZoneService,
              private fb:FormBuilder,
              private cdr: ChangeDetectorRef,
              private snackBar: MatSnackBar) {
  }




  ngOnInit(): void {
    this.fetchZones();

  }
  fetchZones(): void {
    this.zoneService.getAllZones().subscribe({
      next: data => {
        console.log('Data received: ', data);
        this.zones = data;
        this.dataSource = new MatTableDataSource(this.zones);
        this.dataSource.paginator = this.paginator;
        this.cdr.detectChanges();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  openDialog(zone?: any): void {
    const dialogRef = this.dialog.open(ZoneDialogComponent, {
      data: {
        title: zone ? 'Update Zone' : 'New Zone',
        zone: zone || {}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchZones();
      }
    });
  }

  deleteZone(zone: any): void {
    if (confirm(`o you really want to delete this zone : ${zone.zoneName}?`)) {
      this.zoneService.deleteZone(zone).subscribe({
        next: () => {
          this.snackBar.open('Zone deleted', 'Fermer', {
            duration: 3000,
          });
          this.fetchZones();
        },
        error: err => {
          console.log('Error deleting zone:', err);
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




}
