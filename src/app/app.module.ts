import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AdminComponent } from './admin/admin.component';
import { TechnicienComponent } from './technicien/technicien.component';
import { HelpdeskComponent } from './helpdesk/helpdesk.component';
import {AppHttpInterceptor} from "./interceptors/app-http.interceptor";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import { MatIconModule} from "@angular/material/icon";
import { MatSidenavModule} from "@angular/material/sidenav";
import { MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import { ZoneComponent } from './zone/zone.component';
import { ComptoireComponent } from './comptoire/comptoire.component';
import { AeroportComponent } from './aeroport/aeroport.component';
import { ReportingComponent } from './reporting/reporting.component';
import { CustomSidebarComponent } from './custom-sidebar/custom-sidebar.component';
import { ZoneDialogComponent } from './zone-dialog/zone-dialog.component';
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {MatInputModule, MatLabel} from "@angular/material/input";
import { MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import { MatPaginatorModule} from "@angular/material/paginator";
import { AeroportDialogComponent } from './aeroport-dialog/aeroport-dialog.component';
import { CompagnieComponent } from './compagnie/compagnie.component';
import { CompagnieDialogComponent } from './compagnie-dialog/compagnie-dialog.component';
import { ComptoireDialogComponent } from './comptoire-dialog/comptoire-dialog.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { EquipmentDialogComponent } from './equipment-dialog/equipment-dialog.component';
import { ProblemeComponent } from './probleme/probleme.component';
import { ProblemeDialogComponent } from './probleme-dialog/probleme-dialog.component';
import { SolutionComponent } from './solution/solution.component';
import { SolutionDialogComponent } from './solution-dialog/solution-dialog.component';
import { InterventionComponent } from './intervention/intervention.component';
import { InterventionDialogComponent } from './intervention-dialog/intervention-dialog.component';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {MatTable, MatTableModule} from "@angular/material/table";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {InterventionDialogHelpComponent} from "./intervention-dialog-help/intervention-dialog-help.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import { FinishInterventionDialogComponent } from './finish-intervention-dialog/finish-intervention-dialog.component';
import { InterventionFinComponent } from './intervention-fin/intervention-fin.component';
import { InterventionHistoriqueComponent } from './intervention-historique/intervention-historique.component';
import { InterventionsByEquipmentChartComponent } from './interventions-by-equipment-chart/interventions-by-equipment-chart.component';
import {BaseChartDirective} from "ng2-charts";
import { InterventionsByProblemeChartComponent } from './interventions-by-probleme-chart/interventions-by-probleme-chart.component';
import { InterventionHistoriqueAeroportComponent } from './intervention-historique-aeroport/intervention-historique-aeroport.component';
import { UsersComponent } from './users/users.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { TBFDashboardComponent } from './tbfdashboard/tbfdashboard.component';
import { InterventionByComptoireComponent } from './intervention-by-comptoire/intervention-by-comptoire.component';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import { DataImportComponent } from './data-import/data-import.component';
import { ProjetComponent } from './projet/projet.component';
import { ProjetDialogComponent } from './projet-dialog/projet-dialog.component';
import {DatePipe} from "@angular/common";
import { InterventionsByProjetComponent } from './interventions-by-projet/interventions-by-projet.component';
import { InterventionsByProjetYearComponent } from './interventions-by-projet-year/interventions-by-projet-year.component';
import { TbfChartComponent } from './tbf-chart/tbf-chart.component';
import { InterventionsProjetEgeteComponent } from './interventions-projet-egete/interventions-projet-egete.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    LoginComponent,
    AdminComponent,
    TechnicienComponent,
    HelpdeskComponent,
    ZoneComponent,
    ComptoireComponent,
    AeroportComponent,
    ReportingComponent,
    CustomSidebarComponent,
    ZoneDialogComponent,
    AeroportDialogComponent,
    CompagnieComponent,
    CompagnieDialogComponent,
    ComptoireDialogComponent,
    EquipmentComponent,
    EquipmentDialogComponent,
    ProblemeComponent,
    ProblemeDialogComponent,
    SolutionComponent,
    SolutionDialogComponent,
    InterventionComponent,
    InterventionDialogComponent,
    InterventionDialogHelpComponent,
    FinishInterventionDialogComponent,
    InterventionFinComponent,
    InterventionHistoriqueComponent,
    InterventionsByEquipmentChartComponent,
    InterventionsByProblemeChartComponent,
    InterventionHistoriqueAeroportComponent,
    UsersComponent,
    UserDialogComponent,
    TBFDashboardComponent,
    InterventionByComptoireComponent,
    DataImportComponent,
    ProjetComponent,
    ProjetDialogComponent,
    InterventionsByProjetComponent,
    InterventionsByProjetYearComponent,
    TbfChartComponent,
    InterventionsProjetEgeteComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatLabel,
    MatMenuModule,
    MatMenuTrigger,
    MatSidenavModule,
    MatListModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatPaginatorModule,
    MatCardModule,
    MatCardHeader,
    MatCardActions,
    MatCardContent,
    MatTableModule,
    MatTabGroup,
    MatTab,
    BaseChartDirective,
    MatDatepickerToggle,
    MatDatepickerModule,
    MatDatepickerInput,
    MatNativeDateModule,  // Fournisseur pour DateAdapter
    MatFormFieldModule,
    MatInputModule


  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    provideAnimationsAsync()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
