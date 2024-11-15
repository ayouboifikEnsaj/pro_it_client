import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {EquipmentDTO} from "../models/model/model.module";
import {MatPaginator} from "@angular/material/paginator";
import {EquipmentService} from "../services/equipment.service";
import {MatDialog} from "@angular/material/dialog";
import {EquipmentDialogComponent} from "../equipment-dialog/equipment-dialog.component";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrl: './equipment.component.css'
})
export class EquipmentComponent implements OnInit{

  displayedColumns: string[] = ['id', 'equipmentName', 'actions'];
  dataSource = new MatTableDataSource<EquipmentDTO>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private equipmentService: EquipmentService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar
              ) {}

  ngOnInit() {
    this.fetchEquipments();
  }

  fetchEquipments() {
    this.equipmentService.getAllEquipments().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialog(equipment?: EquipmentDTO): void {
    const dialogRef = this.dialog.open(EquipmentDialogComponent, {
      width: '250px',
      data: equipment ? equipment : {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.equipmentService.addOrUpdateEquipment(result).subscribe(() => {
          this.fetchEquipments();
        });
      }
    });
  }

  deleteEquipment(equipment: any): void {
    if (confirm(`Do you really want to delete this equipment ${equipment.equipmentName}?`)) {
      this.equipmentService.deleteEquipment(equipment).subscribe({
        next: () => {
          this.snackBar.open('Equipment deleted', 'Fermer', {
            duration: 3000,
          });
          this.fetchEquipments();
        },
        error: err => {
          console.log('Error deleting Equipment:', err);
        }
      });
    }
  }

}
