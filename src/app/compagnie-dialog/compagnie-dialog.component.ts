import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AeroportService} from "../services/aeroport.service";
import {CompagnieService} from "../services/compagnie.service";

@Component({
  selector: 'app-compagnie-dialog',
  templateUrl: './compagnie-dialog.component.html',
  styleUrl: './compagnie-dialog.component.css'
})
export class CompagnieDialogComponent {

  formCompanie!:FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private dialogRef:MatDialogRef<CompagnieDialogComponent>,
              private fb:FormBuilder,
              private aeroportService:AeroportService,
              private compagnieService:CompagnieService) {
  }

  ngOnInit(): void {
    this.formCompanie = this.fb.group({
      id: [this.data.compagnie.id || null],
      compagnieName: [this.data.compagnie.compagnieName, Validators.required]
    });
  }
  onNoClick() {
    this.dialogRef.close();
  }

  saveCompagnie(): void {
    if (this.formCompanie.valid) {
      const compagnieData = this.formCompanie.value;
      if (compagnieData.id) {
        // Edit zone
        this.compagnieService.updateCompagnie(compagnieData.id,  compagnieData.compagnieName).subscribe({
          next: response => {
            console.log('Compagnie updated:', response);
            this.dialogRef.close(true);
          },
          error: err => {
            console.log('Error updating Compagnie:', err);
          }
        });
      } else {
        // Add new zone
        this.compagnieService.saveCompagnie( compagnieData.compagnieName).subscribe({
          next: response => {
            console.log('compagnie saved:', response);
            this.dialogRef.close(true);
          },
          error: err => {
            console.log('Error saving compagnie:', err);
          }
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }

}
