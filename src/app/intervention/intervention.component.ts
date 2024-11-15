import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { InterventionService } from "../services/intervention.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatSnackBar } from "@angular/material/snack-bar";
import { InterventionDialogComponent } from "../intervention-dialog/intervention-dialog.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Intervention } from '../models/model/model.module';
import { AuthServiceService } from '../services/auth-service.service';
import { InterventionDialogHelpComponent } from '../intervention-dialog-help/intervention-dialog-help.component';
import { enableDebugTools } from '@angular/platform-browser';
import {InterventionFinComponent} from "../intervention-fin/intervention-fin.component";
import {AppUserService} from "../services/app-user.service";

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.css']
})
export class InterventionComponent implements OnInit {
  displayedColumns: string[] = ['id','date', 'heureDebut','heureFin','duration',  'compagnie', 'appUser', 'comptoire', 'equipment', 'solution', 'probleme', 'aeroport','projet', 'action'];
  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('paginatorEncours') paginatorEncours!: MatPaginator;
  @ViewChild('paginatorFermer') paginatorFermer!: MatPaginator;
  public dataSourceEncours: MatTableDataSource<Intervention>;
  public dataSourceFermer: MatTableDataSource<Intervention>;
  formIntervention!: FormGroup;
  isTechnicien: boolean = false;
  isAdmin: boolean = false;
  aeroport!: any ;
  aeroportId!:number;
  constructor(
    private dialog: MatDialog,
    private interventionService: InterventionService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private authService: AuthServiceService,
    private appUserService: AppUserService
  ) {
    //this.dataSource = new MatTableDataSource<Intervention>();
    this.dataSourceEncours = new MatTableDataSource<Intervention>();
    this.dataSourceFermer = new MatTableDataSource<Intervention>();

  }

  ngOnInit(): void {
    this.isTechnicien = this.authService.roles.includes('TECHNICIEN');
    this.isAdmin = this.authService.roles.includes('ADMIN');
    this.fetchInterventions();
    this.formIntervention = this.fb.group({
      id: ['' || null],
      status: ['', Validators.required],
      date: ['', Validators.required],
      heureDebut: ['', Validators.required],
      heureFin: ['', Validators.required],
      compagnie: ['', Validators.required],
      appUser: ['', Validators.required],
      comptoire: ['', Validators.required],
      equipment: ['', Validators.required],
      solution: ['', Validators.required],
      probleme: ['', Validators.required],
      aeroport: ['', Validators.required],
      projet: ['', Validators.required]
    });

  }

  fetchInterventions(): void {
    if (this.isTechnicien) {
      this.fetchInterventionsTech();
    }
    else if (this.isAdmin) {
      this.fetchInterventionsHelp();
    }
    else {
      this.fetchInterventionsHelp();
    }
  }

  fetchInterventionsTech(): void {
    this.interventionService.getAllInterventions(this.authService.username).subscribe({
      next: data => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Réinitialiser l'heure pour ne comparer que la date

        data.forEach(intervention => {
          if (intervention.heureDebut) {
            intervention.heureDebut = new Date('1970-01-01T' + intervention.heureDebut + 'Z');
          }
          if (intervention.heureFin) {
            intervention.heureFin = new Date('1970-01-01T' + intervention.heureFin + 'Z');
          }
          if (intervention.status === 'FERMER' && intervention.heureDebut && intervention.heureFin) {
            const duration = new Date(intervention.heureFin.getTime() - intervention.heureDebut.getTime());
            intervention.duration = duration.getUTCHours() + 'h ' + duration.getUTCMinutes() + 'm';
          } else {
            intervention.duration = 'N/A';
          }
        });

        // Filtrer par statut et par date égale à la date d'aujourd'hui
        this.dataSourceEncours.data = data.filter(intervention =>
          intervention.status === 'ENCOURS' &&
          new Date(intervention.date).setHours(0, 0, 0, 0) === today.getTime()
        );

        this.dataSourceFermer.data = data.filter(intervention =>
          intervention.status === 'FERMER' &&
          new Date(intervention.date).setHours(0, 0, 0, 0) === today.getTime()
        );

        this.dataSourceEncours.paginator = this.paginatorEncours;
        this.dataSourceFermer.paginator = this.paginatorFermer;
        this.cdr.detectChanges();
      },
      error: err => {
        console.log('Error fetching interventions:', err);
      }
    });
  }


  fetchInterventionsHelp(): void {

    this.interventionService.getAllInterventionsHelp().subscribe({
      next: data => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Réinitialiser l'heure pour ne comparer que la date
        data.forEach(intervention => {
          if (intervention.heureDebut) {
            intervention.heureDebut = new Date('1970-01-01T' + intervention.heureDebut + 'Z');
          }
          if (intervention.heureFin) {
            intervention.heureFin = new Date('1970-01-01T' + intervention.heureFin + 'Z');
          }
          if (intervention.status === 'FERMER' && intervention.heureDebut && intervention.heureFin) {
            const duration = new Date(intervention.heureFin.getTime() - intervention.heureDebut.getTime());
            intervention.duration = duration.getUTCHours() + 'h ' + duration.getUTCMinutes() + 'm';
          } else {
            intervention.duration = 'N/A';
          }
        });
        //this.dataSource.data = data;
        //this.dataSource.paginator = this.paginator;
        this.dataSourceEncours.data = data.filter(
          intervention => intervention.status === 'ENCOURS'&&
            new Date(intervention.date).setHours(0, 0, 0, 0) === today.getTime()

        );

        this.dataSourceFermer.data = data.filter(
          intervention => intervention.status === 'FERMER'&&
            new Date(intervention.date).setHours(0, 0, 0, 0) === today.getTime()

        );
        this.dataSourceEncours.paginator = this.paginatorEncours;
        this.dataSourceFermer.paginator = this.paginatorFermer;
        this.cdr.detectChanges();
      },
      error: err => {
        console.log('Error fetching interventions:', err);
      }
    });
  }



  openDialog(intervention?: any): void {
    if(this.isTechnicien){
      const dialogRef = this.dialog.open(InterventionDialogComponent, {data: {
        title: intervention ? 'Update Intervention' : 'New Intervention',
        intervention: intervention || {}
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchInterventions();
      }
    });
    }else{
      const dialogRef = this.dialog.open(InterventionDialogHelpComponent, {data: {
        title: intervention ? 'Update Intervention' : 'New Intervention',
        intervention: intervention || {}
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchInterventions();
      }
    });}


  }

  applyFilter(event: Event, dataSource: MatTableDataSource<any>) {
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.filter = filterValue.trim().toLowerCase();
  }

  editIntervention(intervention: any): void {
    this.openDialog(intervention);
  }

  finishIntervention(intervention: any): void {
    console.log("Open element ",intervention);
    const dialogRef = this.dialog.open(InterventionFinComponent, {
      data: {
        title: 'Complete Intervention',
        intervention: intervention
      }

    });
    dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log("result finish : ",result)
      this.fetchInterventions();
    }
  });
  }


  private fetchInterventionsAdmin() {
    this.interventionService.getAllInterventionsHelp().subscribe({
      next: data => {
        data.forEach(intervention => {
          if (intervention.heureDebut) {
            intervention.heureDebut = new Date('1970-01-01T' + intervention.heureDebut + 'Z');
          }
          if (intervention.heureFin) {
            intervention.heureFin = new Date('1970-01-01T' + intervention.heureFin + 'Z');
          }
        });
        //this.dataSource.data = data;
        //this.dataSource.paginator = this.paginator;
        this.dataSourceEncours.data = data.filter(intervention => intervention.status === 'ENCOURS');
        this.dataSourceFermer.data = data.filter(intervention => intervention.status === 'FERMER');
        //this.dataSourceEncours.paginator = this.paginator;
        //this.dataSourceFermer.paginator = this.paginator;
        this.dataSourceEncours.paginator = this.paginatorEncours;
        this.dataSourceFermer.paginator = this.paginatorFermer;
        this.cdr.detectChanges();
      },
      error: err => {
        console.log('Error fetching interventions:', err);
      }
    });
  }
}
