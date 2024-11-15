import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ZoneService} from "../services/zone.service";
import {AeroportService} from "../services/aeroport.service";
import {ComptoireService} from "../services/comptoire.service";

@Component({
  selector: 'app-comptoire-dialog',
  templateUrl: './comptoire-dialog.component.html',
  styleUrl: './comptoire-dialog.component.css'
})
export class ComptoireDialogComponent implements OnInit{

  formComptoire!:FormGroup;
  zones!: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private dialogRef:MatDialogRef<ComptoireDialogComponent>,
              private fb:FormBuilder,
              private zoneService:ZoneService,
              private comptoireService:ComptoireService,
              private aeroportService:AeroportService) {
  }

  ngOnInit(): void {
    this.fetchComptoires();
    this.formComptoire = this.fb.group({
      id: [this.data.comptoire.id || null],
      comptoireName: [this.data.comptoire.comptoireName, Validators.required],
      zoneId: [this.data.comptoire.zoneId, Validators.required]

    });
  }

  fetchComptoires(){
    this.zoneService.getAllZones().subscribe(data => {

      this.zones=data;
      console.log("comptoire",data);
    });
  }
  onNoClick() {
    this.dialogRef.close();
  }

  saveComptoire(){
      if (this.formComptoire.valid) {
      const comptireData = this.formComptoire.value;
      console.log("SAave",comptireData);
      if (comptireData.id) {
        // Edit zone
        this.comptoireService.updateComptoire(comptireData.id, comptireData.zoneId, comptireData.comptoireName).subscribe({
          next: response => {
            console.log('Comptoire updated:', response);
            this.dialogRef.close(true);
          },
          error: err => {
            console.log('Error updating comptoire:', err);
          }
        });
      } else {
        // Add new zone
        this.comptoireService.saveComptoire(comptireData.comptoireName, comptireData.zoneId).subscribe({
          next: response => {
            console.log('Comptoire saved:', response);
            this.dialogRef.close(true);
          },
          error: err => {
            console.log('Error saving comptoire:', err);
          }
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }

}
