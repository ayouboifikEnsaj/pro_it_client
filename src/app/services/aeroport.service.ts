import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Aeroport, AeroportDTO, Zone} from "../models/model/model.module";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AeroportService {

  constructor(private http:HttpClient) { }

  getAllAeroports():Observable<Array<Aeroport>>{
    return this.http.get<Array<Aeroport>>("http://localhost:8082/admin/aeroports");
  }
  saveAeroport(aeroportName: string) : Observable<any> {
    const aeroport = { aeroportName };
    return this.http.post<any>("http://localhost:8082/admin/add-aeroport",aeroport);
  }
  updateAeroport(id: number, aeroportName: string): Observable<any> {
    const aeroport = { id, aeroportName };
    return this.http.post<any>("http://localhost:8082/admin/aeroport/update", aeroport);
  }

  deleteAeroport(aeroport:Aeroport): Observable<any> {
    return this.http.post<any>("http://localhost:8082/admin/aeroport/delete",aeroport);
  }
  getAeroportCompanie(): Observable<AeroportDTO[]> {
    return this.http.get<AeroportDTO[]>("http://localhost:8082/admin/aeroportCompagnie");
  }
}
