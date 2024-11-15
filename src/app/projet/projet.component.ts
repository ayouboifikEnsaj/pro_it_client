import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {EquipmentDTO, Projet} from "../models/model/model.module";
import {MatPaginator} from "@angular/material/paginator";
import {EquipmentService} from "../services/equipment.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EquipmentDialogComponent} from "../equipment-dialog/equipment-dialog.component";
import {ProjetService} from "../services/projet.service";
import {ProjetDialogComponent} from "../projet-dialog/projet-dialog.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrl: './projet.component.css'
})
export class ProjetComponent implements OnInit{
  displayedColumns: string[] = ['id', 'projetName','actions'];
  dataSource = new MatTableDataSource<Projet>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild("addPaginator") addPaginator!: MatPaginator;
  @ViewChild("removePaginator") removePaginator!: MatPaginator;
  formProjetEquipment!: FormGroup;
  equipments!: any;
  projects!: any;
  dataSourceAdd=new MatTableDataSource<Projet>();
  displayedColumns1:  string[] = ['projet','equipment'];
  dataSourceRemove=new MatTableDataSource<Projet>();

  constructor(private projetService: ProjetService,
              private equipmentService:EquipmentService,
              public dialog: MatDialog,
              private fb:FormBuilder,
              private cdr: ChangeDetectorRef,
              private snackBar: MatSnackBar

  ) {}

  ngOnInit() {
    this.fetchProjets();
    this.fetchEquipment();
    this.formProjetEquipment = this.fb.group({
      id: ['' || null],
      projectName: ['', Validators.required],
      eqipmentId: ['', Validators.required]
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  fetchProjets() {
    this.projetService.getAllProjets().subscribe(data => {
      this.dataSource.data = data;
      //console.log("data : ",data);
      this.dataSource.paginator = this.paginator;
      this.dataSourceAdd.data=data;
      this.dataSourceRemove.data=data;
      this.dataSourceAdd.paginator=this.addPaginator;
      this.dataSourceRemove.paginator=this.removePaginator;
      this.projects=data;
    });
  }
  fetchEquipment(){
    this.equipmentService.getAllEquipments().subscribe(value => {
      this.equipments=value;
    })
  }

  openDialog(projet?: Projet): void {
    const dialogRef = this.dialog.open(ProjetDialogComponent, {
      width: '250px',
      data: projet ? projet : {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projetService.addOrUpdateProjet(result).subscribe(() => {
          this.fetchProjets();
        });
      }
    });
  }

  deleteProjet(projet: any): void {
    if (confirm(`Voulez-vous vraiment supprimer le projet : ${projet.projetName}?`)) {
      this.projetService.deleteProjet(projet).subscribe({
        next: () => {
          this.snackBar.open('Projet supprimée', 'Fermer', {
            duration: 3000,
          });
          this.fetchProjets();
        },
        error: err => {
          console.log('Error deleting Projet:', err);
        }
      });
    }
  }




  addEquipmentToProjet() {
    console.log("data form",this.formProjetEquipment.value);
    this.projetService.addEquipmentToProjet(this.formProjetEquipment.value.projectName,
      this.formProjetEquipment.value.eqipmentId).subscribe({
      next:value => {
        this.fetchProjets();
      }
      ,
      error:err => {
        console.log('Error adding equipment to projet:', err);
        this.snackBar.open('equipment already inexict projet', 'Fermer', {
          duration: 3000,
        });
      }
    })
  }

  removeEquipmentFromProjet() {
    console.log("data Form: ",this.formProjetEquipment.value);
    this.projetService.removeEquipmentFromProjet(this.formProjetEquipment.value.projectName,
      this.formProjetEquipment.value.eqipmentId).subscribe({
      next:value => {
        this.fetchProjets();
      }
      ,
      error:err => {
        console.log('Error removing equipment from projet:', err);
        this.snackBar.open('Error removing equipment from projet', 'Fermer', {
          duration: 3000,
        });
      }
    })
  }
}
