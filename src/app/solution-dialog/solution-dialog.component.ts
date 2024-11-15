import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-solution-dialog',
  templateUrl: './solution-dialog.component.html',
  styleUrl: './solution-dialog.component.css'
})
export class SolutionDialogComponent {


  solutionForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SolutionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.solutionForm = this.fb.group({
      id: [data.id || null],
      libelle: [data.libelle || '', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.solutionForm.valid) {
      this.dialogRef.close(this.solutionForm.value);
    }
  }


}
