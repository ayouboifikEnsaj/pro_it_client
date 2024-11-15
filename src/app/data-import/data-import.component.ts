import { Component } from '@angular/core';
import {DataImportService} from "../services/data-import.service";

@Component({
  selector: 'app-data-import',
  templateUrl: './data-import.component.html',
  styleUrl: './data-import.component.css'
})
export class DataImportComponent {
  selectedFileCompany: File | null = null;
  selectedFileAirport : File | null = null;
  selectedFileUser : File | null = null;
  message: string | null = null;
  selectedFileProblem: File | null = null;
  selectedFileSolution: File | null = null;
  selectedFileZone: File | null = null;
  selectedFileEquipment: File | null = null;
  selectedFileComptoire: File | null = null;
  selectedFileIntervention: File|null=null;

  constructor(private dataImportService: DataImportService) { }

  onFileSelectedCompany(event: any): void {
    this.selectedFileCompany = event.target.files[0];
  }

  onSubmitCompany(): void {
    if (this.selectedFileCompany) {
      this.dataImportService.compagnieUploadExcel(this.selectedFileCompany).subscribe(
        response => {
          this.message = 'File uploaded successfully!';
        },
        error => {
          this.message = 'Failed to upload file: ' + error.message;
        }
      );
    }
  }

  onSubmitAeroports() {
    if (this.selectedFileAirport) {
      this.dataImportService.airportUploadExcel(this.selectedFileAirport).subscribe(
        response => {
          this.message = 'File uploaded successfully!';
        },
        error => {
          this.message = 'Failed to upload file: ' + error.message;
        }
      );
    }
  }

  onFileSelectedAeroports(event: any) {
    this.selectedFileAirport = event.target.files[0];
  }

  onSubmitUsers() {
    if (this.selectedFileUser) {
      this.dataImportService.usersUploadExcel(this.selectedFileUser).subscribe(
        response => {
          this.message = 'File uploaded successfully!';
        },
        error => {
          this.message = 'Failed to upload file: ' + error.message;
        }
      );
    }

  }

  onFileSelectedUsers(event: any) {
    this.selectedFileUser = event.target.files[0];
  }

  onSubmitProblems() {
    if (this.selectedFileProblem) {
      this.dataImportService.problemsUploadExcel(this.selectedFileProblem).subscribe(
        response => {
          this.message = 'File uploaded successfully!';
        },
        error => {
          this.message = 'Failed to upload file: ' + error.message;
        }
      );
    }
  }

  onFileSelectedProblems(event: any) {
    this.selectedFileProblem=event.target.files[0];
  }

  onSubmitSolutions() {
    if (this.selectedFileSolution) {
      this.dataImportService.solutionsUploadExcel(this.selectedFileSolution).subscribe(
        response => {
          this.message = 'File uploaded successfully!';
        },
        error => {
          this.message = 'Failed to upload file: ' + error.message;
        }
      );
    }

  }

  onFileSelectedSolutions(event: any) {
    this.selectedFileSolution=event.target.files[0];
  }

  onSubmitZones() {
    if (this.selectedFileZone) {
      this.dataImportService.zonesUploadExcel(this.selectedFileZone).subscribe(
        response => {
          this.message = 'File uploaded successfully!';
        },
        error => {
          this.message = 'Failed to upload file: ' + error.message;
        }
      );
    }

  }

  onFileSelectedZones(event: any) {
    this.selectedFileZone=event.target.files[0]
  }

  onSubmitEquipment() {
    if (this.selectedFileEquipment) {
      this.dataImportService.equipmentUploadExcel(this.selectedFileEquipment).subscribe(
        response => {
          this.message = 'File uploaded successfully!';
        },
        error => {
          this.message = 'Failed to upload file: ' + error.message;
        }
      );
    }
  }

  onFileSelectedEquipments(event: any) {
    this.selectedFileEquipment=event.target.files[0]
  }

  onFileSelectedComptoires(event: any) {
    this.selectedFileComptoire=event.target.files[0];
  }

  onSubmitComptoire() {
    if (this.selectedFileComptoire) {
      this.dataImportService.comptoireUploadExcel(this.selectedFileComptoire).subscribe(
        response => {
          this.message = 'File uploaded successfully!';
        },
        error => {
          this.message = 'Failed to upload file: ' + error.message;
        }
      );
    }

  }

  onFileSelectedInterventions(event: any) {
    this.selectedFileIntervention=event.target.files[0];
  }

  onSubmitIntervention() {
    if (this.selectedFileIntervention) {
      this.dataImportService.interventionUploadExcel(this.selectedFileIntervention).subscribe(
        response => {
          this.message = 'File uploaded successfully!';
        },
        error => {
          this.message = 'Failed to upload file: ' + error.message;
        }
      );
    }
  }
}
