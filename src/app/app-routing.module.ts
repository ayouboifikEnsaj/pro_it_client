import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {TechnicienComponent} from "./technicien/technicien.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {HelpdeskComponent} from "./helpdesk/helpdesk.component";
import {ReportingComponent} from "./reporting/reporting.component";
import {ZoneComponent} from "./zone/zone.component";
import {AeroportComponent} from "./aeroport/aeroport.component";
import {ComptoireComponent} from "./comptoire/comptoire.component";
import {CompagnieComponent} from "./compagnie/compagnie.component";
import {EquipmentComponent} from "./equipment/equipment.component";
import {InterventionComponent} from "./intervention/intervention.component";
import {ProblemeComponent} from "./probleme/probleme.component";
import {SolutionComponent} from "./solution/solution.component";
import {InterventionHistoriqueComponent} from "./intervention-historique/intervention-historique.component";
import {
  InterventionHistoriqueAeroportComponent
} from "./intervention-historique-aeroport/intervention-historique-aeroport.component";
import {UsersComponent} from "./users/users.component";
import {DataImportComponent} from "./data-import/data-import.component";
import {ProjetComponent} from "./projet/projet.component";

const routes: Routes = [
  {path : "", redirectTo :"/login" ,pathMatch:"full"},
  {path : "login", component: LoginComponent},
  {path :"admin", component:AdminComponent ,
    canActivate:[AuthenticationGuard],
    children :[
      {path : "intervention", component: InterventionComponent},
      {path : "probleme", component: ProblemeComponent},
      {path : "solution", component: SolutionComponent},
      {path : "equipment", component: EquipmentComponent},
      {path : "compagnie", component: CompagnieComponent},
      {path : "reporting", component: ReportingComponent},
      {path : "zone", component: ZoneComponent},
      {path : "aeroport", component: AeroportComponent},
      {path : "comptoire", component: ComptoireComponent},
      {path: "users",component: UsersComponent},
      {path:"data-import",component:DataImportComponent},
      {path: "projet",component: ProjetComponent}


    ]},
  {path :"technicien", component:TechnicienComponent ,
    canActivate:[AuthenticationGuard]
    ,children :[
      {path : "intervention", component:InterventionComponent},
      {path : "intervention/historique", component:InterventionHistoriqueComponent},
      {path :"intervention/historique/aeroport",component:InterventionHistoriqueAeroportComponent}
    ]},
  {path :"helpdesk", component:HelpdeskComponent ,
    canActivate:[AuthenticationGuard],
    children:[
      {path : "intervention", component:InterventionComponent},
      {path : "intervention/historique", component:InterventionHistoriqueComponent}
    ]
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
