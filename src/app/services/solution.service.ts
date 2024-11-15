import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Probleme, Solution} from "../models/model/model.module";

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  private apiUrl ="http://localhost:8082/admin/";
  constructor(private http: HttpClient) { }

  getAllSolutions(): Observable<Solution[]> {
    return this.http.get<Solution[]>(this.apiUrl+"solutions");
  }

  getAllSolutionss():Observable<Array<Solution>>{
    return this.http.get<Array<Solution>>("http://localhost:8082/admin/solutionss");
  }

  /*getProblemeById(id: number): Observable<Probleme> {
    return this.http.get<Probleme>(`${this.apiUrl}/${id}`);
  }*/

  createProbleme(solution: Solution): Observable<Probleme> {
    return this.http.post<Probleme>(this.apiUrl+"add-solution", solution);
  }

  updateProbleme(solution: Solution): Observable<Probleme> {
    console.log("service",solution);
    return this.http.post<Solution>(this.apiUrl+"solution/update", solution);
  }

  deleteProbleme(solution:Solution): Observable<void> {
    return this.http.post<void>(this.apiUrl+"solution/delete",solution);
  }
}
