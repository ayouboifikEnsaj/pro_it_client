import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AppUserService} from "../services/app-user.service";
import {Aeroport, AppRole} from "../models/model/model.module";
import {AeroportService} from "../services/aeroport.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.css'
})
export class UserDialogComponent {
  userForm: FormGroup;
  roles:AppRole[] = []; // Example roles
  aeroports : Aeroport[]=[];
  idUser:any;

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: AppUserService,
    private aeroportService:AeroportService,
    private snackBar: MatSnackBar
  ) {
    /*this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      roles: [[], Validators.required],
      aeroport: [''],
      password: ['', Validators.required]
    });*/
    this.userForm = this.fb.group({
      firstname: [this.data.isEdit ? this.data.user.firstname : '', this.data.isEdit ? [] : Validators.required],
      lastname: [this.data.isEdit ? this.data.user.lastname : '', this.data.isEdit ? [] : Validators.required],
      username: [this.data.isEdit ? this.data.user.username : '', this.data.isEdit ? [] : Validators.required],
      roles: [this.data.isEdit ? this.data.user.roles : [], this.data.isEdit ? [] : Validators.required],
      aeroport: [this.data.isEdit ? this.data.user.aeroport : '', this.data.isEdit ? [] : Validators.required],
      password: ['',Validators.required]  // Facultatif pour édition
    });

    if (data.isEdit) {
      this.userForm.patchValue(data.user);
      this.idUser=data.user.id;
      console.log("L'id est :",this.idUser);
    }
    this.fetchAeroport();
    this.fetchRoles();
  }


  onNoClick(): void {
    this.dialogRef.close(true);

  }

  onSubmit(): void {

      if (this.data.isEdit) {
        const editUser = {
          id:this.idUser,
          firstname: this.userForm.value.firstname,
          lastname: this.userForm.value.lastname,
          username: this.userForm.value.username,
          password: this.userForm.value.password,
          roles: this.userForm.value.roles,
          interventions:[],
          aeroport: { id: this.userForm.value.aeroport.id }
        };
        this.userService.updateUser(editUser).subscribe({
          next: (response) => {
            this.snackBar.open('Utilisateur editer avec succès.', 'Fermer', {
              duration: 3000,
            });
            this.userForm.reset();
            this.onNoClick();
          },
          error: (err) => {
            this.snackBar.open('Erreur lors de l\'update de l\'utilisateur.', 'Fermer', {
              duration: 3000,
            });
            console.error('Error:', err);
          }
        });

        console.log("DATA EDIT FORM",this.userForm.getRawValue());
      } else if (this.userForm.valid) {

        const newUser = {
          id:null,
          firstname: this.userForm.value.firstname,
          lastname: this.userForm.value.lastname,
          username: this.userForm.value.username,
          password: this.userForm.value.password,
          roles: this.userForm.value.roles,
          interventions:[],
          aeroport: { id: this.userForm.value.aeroport.id }
        };

        this.userService.addUser(newUser).subscribe({
          next: (response) => {
            this.snackBar.open('Utilisateur ajouté avec succès.', 'Fermer', {
              duration: 3000,
            });
            this.userForm.reset();
            this.onNoClick();
          },
          error: (err) => {
            this.snackBar.open('Erreur lors de l\'ajout de l\'utilisateur.', 'Fermer', {
              duration: 3000,
            });
            console.error('Error:', err);
          }
        });
        console.log("DATA SAVE FORM",newUser);
      }
    }

  fetchAeroport():void{
    this.aeroportService.getAllAeroports().subscribe(data => {
      this.aeroports = data;
    });
  }
  fetchRoles():void{
    this.userService.getAllRoles().subscribe(data => {
      this.roles = data;
    });
  }

}
