import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {EquipmentDTO, Projet} from "../models/model/model.module";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  constructor(private http:HttpClient) { }
  private apiUrl ="http://localhost:8082/admin/";
  getAllProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.apiUrl+"projets");
  }
  addOrUpdateProjet(projet: Projet): Observable<Projet> {
    return this.http.post<Projet>(this.apiUrl+"projet", projet);
  }

  deleteProjet(projet: Projet): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl+"projet/delete",projet);
  }
  addEquipmentToProjet(projetName: string, eqipmentId: number) :Observable<any>{
    const data={projetName,eqipmentId};
    return this.http.post<any>("http://localhost:8082/admin/addEquipmentToProjet",data)
  }
  removeEquipmentFromProjet(projetName: string, eqipmentId: number) :Observable<any>{
    const data={projetName,eqipmentId};
    return this.http.post<any>("http://localhost:8082/admin/removeEquipmentFromProjet",data)
  }

  getEquipmentsByProjet(id: number): Observable<any> {
    console.log("L'ID",id);
    const params = new HttpParams().set('id', id);
    return this.http.get<any>('http://localhost:8082/admin/equipementsByprojet', { params });
  }
}
