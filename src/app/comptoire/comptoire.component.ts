import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Aeroport, ComptoireDTO} from "../models/model/model.module";
import {MatPaginator} from "@angular/material/paginator";
import {ComptoireService} from "../services/comptoire.service";
import {ZoneDialogComponent} from "../zone-dialog/zone-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ComptoireDialogComponent} from "../comptoire-dialog/comptoire-dialog.component";

@Component({
  selector: 'app-comptoire',
  templateUrl: './comptoire.component.html',
  styleUrl: './comptoire.component.css'
})
export class ComptoireComponent implements OnInit{
  comptoires: ComptoireDTO[] = [];
  constructor(private comptoireService:ComptoireService,
              private dialog:MatDialog,
              private fb:FormBuilder,
              private cdr: ChangeDetectorRef,
              private snackBar: MatSnackBar) {
  }
  displayedColumns: string[] = ['id', 'comptoireName', 'zoneAeroport',"action"];
  dataSource = new MatTableDataSource<ComptoireDTO>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.fetchComptoires();

  }

  fetchComptoires(){
    this.comptoireService.getAllComptoires().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.comptoires=data;
      console.log("comptoire",data);
    });
  }

  openDialog(comptoire?: any): void {
    const dialogRef = this.dialog.open(ComptoireDialogComponent, {
      data: {
        title: comptoire ? 'Update Comptoire' : 'New Comptoire',
        comptoire: comptoire || {}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchComptoires();
      }
    });
  }

  deleteComptoire(comptoire: any): void {
    if (confirm(`Do you really want to delete this Comptoire ${comptoire.zoneName}?`)) {
      this.comptoireService.deleteComptoire(comptoire).subscribe({
        next: () => {
          this.snackBar.open('Comptoire deleted', 'Fermer', {
            duration: 3000,
          });
          this.fetchComptoires();
        },
        error: err => {
          console.log('Error deleting comptoire:', err);
        }
      });
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
