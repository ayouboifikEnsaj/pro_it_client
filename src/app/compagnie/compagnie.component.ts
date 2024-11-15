import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {AeroportService} from "../services/aeroport.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CompagnieService} from "../services/compagnie.service";
import {MatTableDataSource} from "@angular/material/table";
import {AeroportDialogComponent} from "../aeroport-dialog/aeroport-dialog.component";
import {CompagnieDialogComponent} from "../compagnie-dialog/compagnie-dialog.component";
import {AeroportDTO} from "../models/model/model.module";

@Component({
  selector: 'app-compagnie',
  templateUrl: './compagnie.component.html',
  styleUrl: './compagnie.component.css'
})
export class CompagnieComponent implements OnInit {
  displayedColumns: string[] = ['id','compagnieName','action'];
  displayedColumns1: string[] = ['aeroport','compagnieNames'];
  @ViewChild('compagniePaginator') compagniePaginator!: MatPaginator;
  @ViewChild('addcompagniePaginator') addcompagniePaginator!: MatPaginator;
  @ViewChild('removecompagniePaginator') removecompagniePaginator!: MatPaginator;
  public dataSource! : any;
  public dataSource1 = new MatTableDataSource<AeroportDTO>();
  public dataSource2 = new MatTableDataSource<AeroportDTO>();
  public compagnies!:any;
  public aeroports!:any;
  formCompanieAeroport!:FormGroup;
  shouldDisplayCard=false;
  constructor(private dialog:MatDialog,
              private compagnieService:CompagnieService,
              private aeroportService:AeroportService,
              private fb:FormBuilder,
              private cdr: ChangeDetectorRef,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.fetchCompagnies();
    this.fetchAeroports();
    this.fetchAeroportCompagnie();
    this.formCompanieAeroport = this.fb.group({
      id: ['' || null],
      compagnieName: ['', Validators.required],
      aeroportName: ['', Validators.required]
    });
  }
  fetchCompagnies(){
    this.compagnieService.getAllCompagnies().subscribe({
      next: data => {
        console.log('Data received: ', data);
        this.compagnies = data;
        this.dataSource = new MatTableDataSource(this.compagnies);
        this.dataSource.paginator = this.compagniePaginator;
        this.cdr.detectChanges();
      },
      error: err => {
        console.log(err);
      }
    });

  }
  fetchAeroports(){
    this.aeroportService.getAllAeroports().subscribe({
      next: data => {
        console.log('Data received: ', data);
        this.aeroports = data;
      },
      error: err => {
        console.log(err);
      }
    });

  }
  fetchAeroportCompagnie(){
    this.aeroportService.getAeroportCompanie().subscribe(
      data => {
      this.dataSource1.data = data;
      this.dataSource1.paginator = this.addcompagniePaginator;
        this.dataSource2.data = data;
        this.dataSource2.paginator = this.removecompagniePaginator;
    });
  }
  openDialog(compagnie?: any): void {
    const dialogRef = this.dialog.open(CompagnieDialogComponent, {
      data: {
        title: compagnie ? 'Update Compagnie' : 'New Compagnie',
        compagnie: compagnie || {}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchCompagnies();
      }
    });
  }
  deleteCompagnie(compagnie: any): void {
    if (confirm(`Do you really want to delete this compagnie ${compagnie.compagnieName}?`)) {
      this.compagnieService.deleteCompagnie(compagnie).subscribe({
        next: () => {
          this.snackBar.open('compagnie deleted', 'Fermer', {
            duration: 3000,
          });
          this.fetchCompagnies();
        },
        error: err => {
          console.log('Error deleting compagnie:', err);
        }
      });
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addCompagnieToAerport() {
    console.log("data form",this.formCompanieAeroport.value);
    this.compagnieService.addCompagnieToAeroport(this.formCompanieAeroport.value.aeroportName,
      this.formCompanieAeroport.value.compagnieName).subscribe({
      next:value => {
        this.fetchAeroportCompagnie();
      }
        ,
      error:err => {
        console.log('Error adding compagnie to aeroport:', err);
        this.snackBar.open('Compagnie already inexict aeroport', 'Fermer', {
          duration: 3000,
        });
      }
    })
  }

  removeCompagnieToAerport() {
    console.log("data",this.formCompanieAeroport.value);
    this.compagnieService.removeCompagnieToAeroport(this.formCompanieAeroport.value.aeroportName,
      this.formCompanieAeroport.value.compagnieName).subscribe({
      next:value => {
        this.fetchAeroportCompagnie();
      }
      ,
      error:err => {
        console.log('Error removing compagnie from aeroport:', err);
        this.snackBar.open('Error removing compagnie from aeroport', 'Fermer', {
          duration: 3000,
        });
      }
    })
  }
}
