import { Injectable } from '@angular/core';
import {Intervention} from "../models/model/model.module";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthServiceService} from "./auth-service.service";
import {Interventiion} from "../models/model/intervention.model";

@Injectable({
  providedIn: 'root'
})
export class InterventionService {

  private baseUrl1 = 'http://localhost:8082/technicien';
  private baseUrl2 = 'http://localhost:8082/helpdesk';
  private baseUrl3 = 'http://localhost:8082/admin';

  constructor(private http: HttpClient, private authService: AuthServiceService) {}

  getAllInterventions(username: string): Observable<Intervention[]> {
    return this.http.get<Intervention[]>(`${this.baseUrl1}/interventions/username`,
      {
        params: { username }
      }
      );
  }
  getAllInterventionsFilter(username: string): Observable<Interventiion[]> {
    return this.http.get<Interventiion[]>(`${this.baseUrl1}/interventions/username`,
      {
        params: { username }
      }
    );
  }
  getAllInterventionsByAeroport(aeroport: string): Observable<Intervention[]> {
    return this.http.get<Intervention[]>(`${this.baseUrl1}/interventions/aeroport`,
      {
        params: { aeroport }
      }
    );
  }
  getAllInterventionsByAeroportFilter(aeroport: string): Observable<Interventiion[]> {
    return this.http.get<Interventiion[]>(`${this.baseUrl1}/interventions/aeroport`,
      {
        params: { aeroport }
      }
    );
  }
  getAllInterventiions(): Observable<Intervention[]> {
    return this.http.get<Intervention[]>(`${this.baseUrl3}/interventions`
    );
  }
  getAllInterventiiions(): Observable<Interventiion[]> {
    return this.http.get<Interventiion[]>(`${this.baseUrl3}/interventions`
    );
  }





  getInterventionPercentages(comptoireId: number, month: number, year: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl3}/percentages?comptoireId=${comptoireId}&month=${month}&year=${year}`);
  }




  getAllInterventionsHelp(): Observable<Intervention[]> {
    return this.http.get<Intervention[]>(`${this.baseUrl2}/interventions`);
  }
  getAllInterventionsHelpFiltre(): Observable<Interventiion[]> {
    return this.http.get<Interventiion[]>(`${this.baseUrl2}/interventions`);
  }
  getAllInterventionsHelpId(id: number): Observable<Intervention[]> {
    console.log("bad , id ",id);
    return this.http.get<Intervention[]>(`${this.baseUrl2}/interventions/id/${id}`);
  }


  getTBFByEquipmentAndCompany(equipmentId: number, month: number, year: number): Observable<any> {
    return this.http.get(`http://localhost:8082/admin/tbf/${equipmentId}/${month}/${year}`);
  }



  addIntervention(intervention: Intervention): Observable<Intervention> {
    const interventionData: Intervention = {
      id: intervention.id,
      status: intervention.status,
      date: intervention.date,
      heureDebut: intervention.heureDebut,
      heureFin: intervention.heureFin,
      compagnie: intervention.compagnie,
      appUser: intervention.appUser,
      comptoire: intervention.comptoire,
      equipment: intervention.equipment,
      solution: intervention.solution,
      probleme: intervention.probleme,
      aeroport: intervention.aeroport,
      projet:intervention.projet,
      duration:0
    };
    return this.http.post<Intervention>(`${this.baseUrl1}/intervention`, interventionData);
  }

  addInterventionHelp(intervention: Intervention): Observable<Intervention> {
    const interventionData: Intervention = {
      id: intervention.id,
      status: intervention.status,
      date: intervention.date,
      heureDebut: intervention.heureDebut,
      heureFin: intervention.heureFin,
      compagnie: intervention.compagnie,
      appUser: intervention.appUser,
      comptoire: intervention.comptoire,
      equipment: intervention.equipment,
      solution: intervention.solution,
      probleme: intervention.probleme,
      aeroport: intervention.aeroport,
      projet:intervention.projet,
      duration:0
    };
    console.log("service ", interventionData);
    return this.http.post<Intervention>(`${this.baseUrl2}/intervention`, interventionData);
  }

  updateIntervention(id: number, intervention: Intervention): Observable<Intervention> {
    const interventionData: Intervention = {
      id: intervention.id,
      status: intervention.status,
      date: intervention.date,
      heureDebut: intervention.heureDebut,
      heureFin: intervention.heureFin,
      compagnie: intervention.compagnie,
      appUser: intervention.appUser,
      comptoire: intervention.comptoire,
      equipment: intervention.equipment,
      solution: intervention.solution,
      probleme: intervention.probleme,
      aeroport: intervention.aeroport,
      projet:intervention.projet,
      duration:0
    };
    return this.http.post<Intervention>(`${this.baseUrl1}/intervention/update`, interventionData);
  }

  updateInterventionHelp(id: number, intervention: Intervention): Observable<Intervention> {
    const interventionData: Intervention = {
      id: intervention.id,
      status: intervention.status,
      date: intervention.date,
      heureDebut: intervention.heureDebut,
      heureFin: intervention.heureFin,
      compagnie: intervention.compagnie,
      appUser: intervention.appUser,
      comptoire: intervention.comptoire,
      equipment: intervention.equipment,
      solution: intervention.solution,
      probleme: intervention.probleme,
      aeroport: intervention.aeroport,
      projet:intervention.projet,
      duration:0
    };
    return this.http.post<Intervention>(`${this.baseUrl2}/intervention/update`, interventionData);
  }


  endIntervention(intervention: Intervention): Observable<Intervention> {
    console.log('Avant:', intervention);
    const interventionData: Intervention = {
      id: intervention.id,
      status: 'FERMER', // Set status to 'FERMER'
      date: intervention.date,
      heureDebut: intervention.heureDebut,
      heureFin: new Date(), // Set heureFin to current time
      compagnie: parseInt(intervention.compagnie.toString(), 10), // Ensure compagnie is a number
      appUser: parseInt(intervention.appUser.toString(), 10), // Ensure appUser is a number
      comptoire: parseInt(intervention.comptoire.toString(), 10), // Ensure comptoire is a number
      equipment: parseInt(intervention.equipment.toString(), 10), // Ensure equipment is a number
      solution: parseInt(intervention.solution.toString(), 10), // Ensure solution is a number
      probleme: parseInt(intervention.probleme.toString(), 10), // Ensure probleme is a number
      aeroport: parseInt(intervention.aeroport.toString(), 10), // Ensure aeroport is a number
      projet: parseInt(intervention.projet.toString(), 10), // Ensure projet is a number
      duration:0
    };

    console.log('Sending intervention data to end:', interventionData);

    return this.http.post<Intervention>(`${this.baseUrl1}/intervention/fin`, interventionData);
  }

  endInterventionHelp(intervention: Intervention): Observable<Intervention> {
    const interventionData: Intervention = {
      id: intervention.id,
      status: 'FERMER', // Set status to 'FERMER'
      date: intervention.date,
      heureDebut: intervention.heureDebut,
      heureFin: new Date(), // Set heureFin to current time
      compagnie: parseInt(intervention.compagnie.toString(), 10), // Ensure compagnie is a number
      appUser: parseInt(intervention.appUser.toString(), 10), // Ensure appUser is a number
      comptoire: parseInt(intervention.comptoire.toString(), 10), // Ensure comptoire is a number
      equipment: parseInt(intervention.equipment.toString(), 10), // Ensure equipment is a number
      solution: parseInt(intervention.solution.toString(), 10), // Ensure solution is a number
      probleme: parseInt(intervention.probleme.toString(), 10), // Ensure probleme is a number
      aeroport: parseInt(intervention.aeroport.toString(), 10), // Ensure aeroport is a number
      projet: parseInt(intervention.projet.toString(), 10), // Ensure projet is a number
      duration:0
    };

    console.log('Sending intervention data to end:', interventionData);

    return this.http.post<Intervention>(`${this.baseUrl2}/intervention/fin`, interventionData);
  }


  getInterventionsByProblemType() {
    return this.http.get<any>(`${this.baseUrl3}/interventions/by-problem-type`
    );
  }
  getInterventionsByProblemTypeAnsMonth() {
    return this.http.get<any>(`${this.baseUrl3}/interventions/by-problem-and-month`
    );
  }
  getInterventionsByAiroport(aeroportId:number){
    return this.http.get<any>(`${this.baseUrl3}/interventions/aeroport`,
      {
        params:{
          aeroportId
        }
      }
    );
  }


  getTbf(projetId: number, month: number, year: number, aeroportId: number) :Observable<any>{

    return this.http.get<any>(`${this.baseUrl3}/interventions/tbf`,
      {
        params: { projetId,
          month,
          year,
          aeroportId
        }
      }
      );
  }

  getTbfYear(projetId: number, year: number, aeroportId: number) :Observable<any>{

    return this.http.get<any>(`${this.baseUrl3}/interventions/tbf/year`,
      {
        params: { projetId,
          year,
          aeroportId
        }
      }
    );
  }

  getInterventionsByAiroportAndProjet(aeroportId:number){
    return this.http.get<any>(`${this.baseUrl3}/interventions/aeroport/projet`,
      {
        params:{
          aeroportId
        }
      }
    );
  }
  getInterventionsByAiroportAndProjetEGate(aeroportId:number){
    return this.http.get<any>(`${this.baseUrl3}/interventions/aeroport/projet/egate`,
      {
        params:{
          aeroportId
        }
      }
    );
  }
}
