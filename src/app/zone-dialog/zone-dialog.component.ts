import {Component, Inject, inject, model, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ZoneService} from "../services/zone.service";
import {AeroportService} from "../services/aeroport.service";
import {MatTableDataSource} from "@angular/material/table";
import {Aeroport} from "../models/model/model.module";

@Component({
  selector: 'app-zone-dialog',
  templateUrl: './zone-dialog.component.html',
  styleUrl: './zone-dialog.component.css'
})
export class ZoneDialogComponent implements OnInit{
  formZone!:FormGroup;
  aeroports: Aeroport[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private dialogRef:MatDialogRef<ZoneDialogComponent>,
              private fb:FormBuilder,
              private zoneService:ZoneService,
              private aeroportService:AeroportService) {
  }





  onNoClick() {
    this.dialogRef.close();
  }



  ngOnInit(): void {
    this.getAllAeroports();
    this.formZone = this.fb.group({
      id: [this.data.zone.id || null],
      zoneName: [this.data.zone.zoneName, Validators.required]
    });

  }

  saveZone(): void {
    if (this.formZone.valid) {
      const zoneData = this.formZone.value;
      if (zoneData.id) {
        // Edit zone
        this.zoneService.updateZone(zoneData.id, zoneData.zoneName).subscribe({
          next: response => {
            console.log('Zone updated:', response);
            this.dialogRef.close(true);
          },
          error: err => {
            console.log('Error updating zone:', err);
          }
        });
      } else {
        // Add new zone
        this.zoneService.saveZone(zoneData.zoneName).subscribe({
          next: response => {
            console.log('Zone saved:', response);
            this.dialogRef.close(true);
          },
          error: err => {
            console.log('Error saving zone:', err);
          }
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }

  getAllAeroports(){
    this.aeroportService.getAllAeroports().subscribe({
      next:data => {
        console.log("Aerports : ",data);
        this.aeroports=data;
      },
      error:err => {
        console.log("Aerports ERRor : "+err);
      }
    })
  }


}

