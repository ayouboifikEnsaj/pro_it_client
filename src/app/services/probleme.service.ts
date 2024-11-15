import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Probleme} from "../models/model/model.module";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProblemeService {
  private apiUrl ="http://localhost:8082/admin/";
  constructor(private http: HttpClient) { }

  getAllProblemes(): Observable<Probleme[]> {
    return this.http.get<Probleme[]>(this.apiUrl+"problemes");
  }

  getAllProblemss():Observable<Array<Probleme>>{
    return this.http.get<Array<Probleme>>("http://localhost:8082/admin/problemes");
  }

  /*getProblemeById(id: number): Observable<Probleme> {
    return this.http.get<Probleme>(`${this.apiUrl}/${id}`);
  }*/

  createProbleme(probleme: Probleme): Observable<Probleme> {
    return this.http.post<Probleme>(this.apiUrl+"add-problem", probleme);
  }

  updateProbleme(probleme: Probleme): Observable<Probleme> {
    console.log("service",probleme);
    return this.http.post<Probleme>(this.apiUrl+"problem/update", probleme);
  }

  deleteProbleme(probleme:Probleme): Observable<void> {
    return this.http.post<void>(this.apiUrl+"problem/delete",probleme);
  }
}
