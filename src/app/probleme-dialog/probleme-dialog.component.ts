import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-probleme-dialog',
  templateUrl: './probleme-dialog.component.html',
  styleUrl: './probleme-dialog.component.css'
})
export class ProblemeDialogComponent {

  problemeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProblemeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.problemeForm = this.fb.group({
      id: [data.id || null],
      libelle: [data.libelle || '', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.problemeForm.valid) {
      this.dialogRef.close(this.problemeForm.value);
    }
  }

}
