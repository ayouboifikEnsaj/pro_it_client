import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Aeroport} from "../models/model/model.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ZoneService} from "../services/zone.service";
import {AeroportService} from "../services/aeroport.service";

@Component({
  selector: 'app-aeroport-dialog',
  templateUrl: './aeroport-dialog.component.html',
  styleUrl: './aeroport-dialog.component.css'
})
export class AeroportDialogComponent implements OnInit{
  formAeroport!:FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private dialogRef:MatDialogRef<AeroportDialogComponent>,
              private fb:FormBuilder,
              private aeroportService:AeroportService) {
  }

  ngOnInit(): void {
    this.formAeroport = this.fb.group({
      id: [this.data.aeroport.id || null],
      aeroportName: [this.data.aeroport.aeroportName, Validators.required]
    });
  }
  onNoClick() {
    this.dialogRef.close();
  }

  saveAeroport(): void {
    if (this.formAeroport.valid) {
      const aeroportData = this.formAeroport.value;
      if (aeroportData.id) {
        // Edit zone
        this.aeroportService.updateAeroport(aeroportData.id,  aeroportData.aeroportName).subscribe({
          next: response => {
            console.log('Aeroport updated:', response);
            this.dialogRef.close(true);
          },
          error: err => {
            console.log('Error updating Aeroport:', err);
          }
        });
      } else {
        // Add new zone
        this.aeroportService.saveAeroport( aeroportData.aeroportName).subscribe({
          next: response => {
            console.log('aeroport saved:', response);
            this.dialogRef.close(true);
          },
          error: err => {
            console.log('Error saving aeroport:', err);
          }
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }

}
