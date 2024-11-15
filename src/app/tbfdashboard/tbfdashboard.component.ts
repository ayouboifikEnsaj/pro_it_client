import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { InterventionService } from '../services/intervention.service';
import { EquipmentService } from '../services/equipment.service';
import {EquipmentDTO, Projet} from '../models/model/model.module';
import {AeroportService} from "../services/aeroport.service";
import {ProjetService} from "../services/projet.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-tbfdashboard',
  templateUrl: './tbfdashboard.component.html',
  styleUrls: ['./tbfdashboard.component.css']
})
export class TBFDashboardComponent implements OnInit {
  form: FormGroup;
  public aeroports!:any;
  public projects!: Projet[];
  resultTBF: number | null = null;
  constructor(private interventionservice: InterventionService,
              private aeroportService:AeroportService,
              private projetService:ProjetService,
              private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      projet: ['',Validators.required],
      aeroport: ['',Validators.required],
      date: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchAeroports();
    this.fetchProjets();
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
  fetchProjets() {
    this.projetService.getAllProjets().subscribe(data => {
      this.projects=data;
    });
  }
  onSubmit(): void {
    if(this.form.valid){
      const selectedProjetId = this.form.get('projet')?.value;
      const selectedAeroportId = this.form.get('aeroport')?.value;
      const selectedDate = this.form.get('date')?.value;
      const year =selectedDate.getFullYear();
      const month=selectedDate.getMonth();
      console.log('Projet ID:', selectedProjetId);
      console.log('Aéroport ID:', selectedAeroportId);
      console.log('Date sélectionnée:', selectedDate);
      console.log('Year sélectionnée:', year);
      console.log('Month sélectionnée:', month);
      this.interventionservice.getTbf(selectedProjetId,month+1,year,selectedAeroportId).subscribe(
        {
          next: data => {
            console.log('TBF : ', data);
            this.resultTBF=data;
          },
          error: err => {
            console.log(err);
          }
        }
      );
    }

  }
  getFormattedResultTBF(): string {
    if (this.resultTBF !== null) {
      return (Math.floor(this.resultTBF * 100) / 100).toFixed(2);
    }
    return '';
  }
}
