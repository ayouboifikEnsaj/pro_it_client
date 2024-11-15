import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ComptoireService} from "../services/comptoire.service";
import {ComptoireDTO} from "../models/model/model.module";

@Component({
  selector: 'app-equipment-dialog',
  templateUrl: './equipment-dialog.component.html',
  styleUrl: './equipment-dialog.component.css'
})
export class EquipmentDialogComponent implements OnInit{
  equipmentForm: FormGroup;
  comptoires: ComptoireDTO[] = [];
  constructor(
    public dialogRef: MatDialogRef<EquipmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private comptoireService:ComptoireService
  ) {
    this.equipmentForm = this.fb.group({
      id: [data.id || null],
      equipmentName: [data.equipmentName || '', Validators.required]
    });
  }
  ngOnInit(): void {
    this.loadComptoires();
  }

  loadComptoires() {
    this.comptoireService.getAllComptoires().subscribe(comptoires => {
      this.comptoires = comptoires;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.equipmentForm.valid) {
      this.dialogRef.close(this.equipmentForm.value);
    }
  }

}
