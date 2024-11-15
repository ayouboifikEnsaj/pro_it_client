import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ComptoireDTO, Projet} from "../models/model/model.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ComptoireService} from "../services/comptoire.service";
import {ProjetService} from "../services/projet.service";

@Component({
  selector: 'app-projet-dialog',
  templateUrl: './projet-dialog.component.html',
  styleUrl: './projet-dialog.component.css'
})
export class ProjetDialogComponent implements OnInit{
  projetForm: FormGroup;
  projets: Projet[] = [];
  constructor(
    public dialogRef: MatDialogRef<ProjetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private projetService:ProjetService
  ) {
    this.projetForm = this.fb.group({
      id: [data.id || null],
      projetName: [data.projetName || '', Validators.required]
    });
  }
  ngOnInit(): void {
    this.loadProjets();
  }

  loadProjets() {
    this.projetService.getAllProjets().subscribe(projets => {
      this.projets = projets;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.projetForm.valid) {
      this.dialogRef.close(this.projetForm.value);
    }
  }

}
