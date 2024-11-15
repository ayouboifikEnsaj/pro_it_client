import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ComptoireDTO, Zone} from "../models/model/model.module";
import {InterventionService} from "../services/intervention.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthServiceService} from "../services/auth-service.service";
import {AppUser, Interventiion} from "../models/model/intervention.model";
import {AppUserService} from "../services/app-user.service";
import {ComptoireService} from "../services/comptoire.service";
import {ZoneService} from "../services/zone.service";

@Component({
  selector: 'app-intervention-historique-aeroport',
  templateUrl: './intervention-historique-aeroport.component.html',
  styleUrl: './intervention-historique-aeroport.component.css'
})
export class InterventionHistoriqueAeroportComponent implements OnInit{
  displayedColumns: string[] = ['id', 'date', 'heureDebut', 'heureFin','duration', 'compagnie', 'appUser', 'comptoire', 'equipment', 'solution', 'probleme','project', 'aeroport'];

  @ViewChild('paginatorFermer') paginatorFermer!: MatPaginator;
  public dataSourceFermer: MatTableDataSource<Interventiion>;
  isTechnicien: boolean = false;
  isAdmin: boolean = false;

  durationOptions: string[] = ['Supérieur à 10 min',
    'Supérieur à 15 min',
    'Inférieur à 10 min',
    'Inférieur à 15 min'];
  selectedDuration: string = '';
  comptoires: ComptoireDTO[] = [];
  selectedComptoire: ComptoireDTO | null = null;
  techniciens: any[]=[];
  selectedtechnicien: AppUser|null=null;
  selectedDate: Date | null = null;
  selectedZone: Zone|null=null;
  selectedMonth: Date | null = null;
  zones: Zone[]=[];

  constructor(
    private interventionService: InterventionService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private authService: AuthServiceService,
    private userService:AppUserService,
    private comptoireService:ComptoireService,
    private zoneService:ZoneService
  ) {
    this.dataSourceFermer = new MatTableDataSource<Interventiion>();
  }
  ngOnInit(): void {
    this.isTechnicien = this.authService.roles.includes('TECHNICIEN');
    this.isAdmin = this.authService.roles.includes('ADMIN');
    this.fetchZones();
    this.fetchUsers();
    this.fetchInterventions();
  }

  fetchInterventions(): void {
    if (this.isTechnicien) {
      this.fetchInterventionsTech();
    }
    else {
      this.fetchInterventionsHelp();
    }
  }
  fetchInterventionsTech(): void {
    this.interventionService.getAllInterventionsByAeroportFilter(this.authService.username).subscribe({
      next: data => {
        this.processInterventions(data);
      },
      error: err => {
        console.log('Error fetching interventions:', err);
      }
    });
  }

  fetchInterventionsHelp(): void {
    this.interventionService.getAllInterventionsHelpFiltre().subscribe({
      next: data => {
        this.processInterventions(data);
      },
      error: err => {
        console.log('Error fetching interventions:', err);
      }
    });
  }
  processInterventions(data: Interventiion[]): void {
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

    this.dataSourceFermer.data = data.filter(intervention => intervention.status === 'FERMER');
    this.dataSourceFermer.paginator = this.paginatorFermer;
    this.cdr.detectChanges();
  }

  applyFilter():void {
    let filteredData = this.dataSourceFermer.data;

    if (this.selectedDuration) {
      if (this.selectedDuration.includes('Supérieur')) {
        const minutes = this.selectedDuration.includes('10 min') ? 10 : 15;
        filteredData = filteredData.filter(intervention =>
          intervention.duration && this.convertToMinutes(intervention.duration) > minutes
        );
      } else if (this.selectedDuration.includes('Inférieur')) {
        const minutes = this.selectedDuration.includes('10 min') ? 10 : 15;
        filteredData = filteredData.filter(intervention =>
          intervention.duration && this.convertToMinutes(intervention.duration) < minutes);
      }
    }


    if (this.selectedComptoire) {
      filteredData = filteredData.filter(intervention =>
        intervention.comptoire?.comptoireName === this.selectedComptoire?.comptoireName

      );
    }

    if(this.selectedtechnicien){
      filteredData=filteredData.filter(intervention =>
        intervention.appUser?.username===this.selectedtechnicien?.username

      );
    }
    if (this.selectedDate) {
      filteredData = filteredData.filter(intervention =>
        new Date(intervention.date).toDateString() === this.selectedDate?.toDateString()
      );
    }
    if (this.selectedMonth) {
      filteredData = filteredData.filter(intervention =>{
          const interventionDate = new Date(intervention.date);
          const interventionMonth = interventionDate.getMonth();
          const interventionYear = interventionDate.getFullYear();
          return interventionMonth === this.selectedMonth?.getMonth() && interventionYear === this.selectedMonth?.getFullYear();
        }
      );
    }

    this.dataSourceFermer.data = filteredData;
  }

  clearFilter() {
    this.selectedDuration = '';
    this.selectedComptoire = null;
    this.selectedDate=null;
    this.selectedtechnicien=null;
    this.selectedMonth=null;
    this.fetchInterventions();
  }
  convertToMinutes(duration: string): number {
    const parts = duration.split(' ');
    const hours = parseInt(parts[0]) || 0;
    const minutes = parseInt(parts[1]) || 0;
    return hours * 60 + minutes;
  }
  fetchUsers(): void {
    this.userService.getAllUsersWithRoleAndAeroport("TECHNICIEN",this.authService.aeroport.aeroportName).subscribe(data => {
      this.techniciens=data;
    });

  }
  fetchComptoires(): void {
    this.comptoireService.getAllComptoires().subscribe({
      next: comptoires => {
        this.comptoires = comptoires.filter(comptoire => comptoire.zoneId === this.selectedZone?.id);
      },
      error: err => {
        console.log('Error fetching comptoires:', err);
      }
    });
  }
  fetchZones() {
    this.zoneService.getAllZones().subscribe(data => {
      this.zones=data;
    });
  }
}
