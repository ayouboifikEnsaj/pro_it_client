import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EquipmentService} from "../services/equipment.service";
import {SolutionService} from "../services/solution.service";
import {ProblemeService} from "../services/probleme.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {InterventionService} from "../services/intervention.service";
import {Intervention} from "../models/model/model.module";
import {AuthServiceService} from "../services/auth-service.service";
import {ProjetService} from "../services/projet.service";

@Component({
  selector: 'app-intervention-fin',
  templateUrl: './intervention-fin.component.html',
  styleUrl: './intervention-fin.component.css'
})
export class InterventionFinComponent {
  formIntervention!: FormGroup;
  equipments!: any[];
  solutions!: any[];
  problemes!: any[];
  isTechnicien: boolean = false;
  isAdmin: boolean = false;
  ishelpDesk: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<InterventionFinComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private equipmentService:EquipmentService,
    private solutionService:SolutionService,
    private problemeService:ProblemeService,
    private snackBar: MatSnackBar,
    private interventionService: InterventionService,
    private authService: AuthServiceService,
    private projetService:ProjetService
  ) {
    this.formIntervention = this.fb.group({
      equipment: [data.intervention.equipment?.id || '', Validators.required],
      solution: [data.intervention.solution?.id || '', Validators.required],
      probleme: [data.intervention.probleme?.id || '', Validators.required]
    });
    console.log("data fin : ",data.intervention);
    this.loadDependencies();
    this.isTechnicien = this.authService.roles.includes('TECHNICIEN');
    this.isAdmin = this.authService.roles.includes('ADMIN');
    this.ishelpDesk = this.authService.roles.includes('HELP_DESK');
  }
  loadDependencies(): void {
    console.log("ID PROJET",this.data.intervention.projet.id);
    this.projetService.getEquipmentsByProjet(this.data.intervention.projet.id).subscribe(data => {
      this.equipments = data;
      console.log("equiii : ",data);
    });

    this.solutionService.getAllSolutions().subscribe(data => {
      this.solutions = data;
    });

    this.problemeService.getAllProblemss().subscribe(data => {
      this.problemes = data;
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  finishInterventionTech(intervention: any): void {
    this.interventionService.endIntervention(intervention).subscribe({
      next: data => {
        this.snackBar.open('Intervention terminée avec succès', 'Fermer', { duration: 3000 });
        //this.fetchInterventionsTech();
      },
      error: err => {
        console.log('Error finishing intervention:', err);
        this.snackBar.open('Erreur lors de la terminaison de l\'intervention', 'Fermer', { duration: 3000 });
      }
    });
  }


  finishInterventionHelp(intervention: any): void {
    this.interventionService.endInterventionHelp(intervention).subscribe({
      next: data => {
        this.snackBar.open('Intervention terminée avec succès', 'Fermer', { duration: 3000 });
        //this.fetchInterventionsHelp();
      },
      error: err => {
        console.log('Error finishing intervention:', err);
        this.snackBar.open('Erreur lors de la terminaison de l\'intervention', 'Fermer', { duration: 3000 });
      }
    });
  }

  finIntervention() {
    if (this.formIntervention.valid) {
      const formValue = this.formIntervention.getRawValue();
      console.log("from : ",formValue);
      const interventionData: Intervention = {
        id: this.data.intervention.id,
        status: this.data.status,
        date: new Date(this.data.intervention.date),
        heureDebut: new Date(`1970-01-01T${this.data.intervention.heureDebut}:00Z`),
        heureFin: this.data.intervention.heureFin ? new Date(`1970-01-01T${this.data.intervention.heureFin}:00Z`) : null,
        compagnie: this.data.intervention.compagnie,
        appUser: this.data.intervention.appUser,
        comptoire: this.data.intervention.comptoire,
        equipment: formValue.equipment,
        solution: formValue.solution,
        probleme: formValue.probleme,
        aeroport: this.data.intervention.aeroport,
        projet: this.data.intervention.projet,
        duration:0
      };

      if(this.isTechnicien){
        console.log("show data tech : ",interventionData);
        this.finishInterventionTech(interventionData);
        this.dialogRef.close(true);
      }else {
        console.log("show data help : ",interventionData);
        this.finishInterventionHelp(interventionData);
        this.dialogRef.close(true);
      }

    }
    else
    {
      console.log("form invalid");
    }
  }
}
