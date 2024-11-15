import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ComptoireDTO, Zone} from "../models/model/model.module";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ComptoireService {

  constructor(private http:HttpClient) {

  }
  getAllComptoires(): Observable<ComptoireDTO[]> {
    return this.http.get<ComptoireDTO[]>("http://localhost:8082/admin/comptoiires");
  }

  saveComptoire(comptoireName:string, zoneId: number) {
    const comptoire = { comptoireName, zoneId };
    return this.http.post<any>("http://localhost:8082/admin/add-comptoire",comptoire);
  }


  deleteComptoire(comptoire: ComptoireDTO) {
    return this.http.post<any>("http://localhost:8082/admin/comptoire/delete",comptoire);
  }




  updateComptoire(id:number, zoneId:number, comptoireName:string): Observable<any> {
    const comptoire = { id,zoneId, comptoireName };
    console.log("UPDATE ",comptoire);
    return this.http.post<any>("http://localhost:8082/admin/comptoire/update", comptoire);

  }
}
