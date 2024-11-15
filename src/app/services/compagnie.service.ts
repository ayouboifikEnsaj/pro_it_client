import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Compagnie} from "../models/model/model.module";

@Injectable({
  providedIn: 'root'
})
export class CompagnieService {

  constructor(private http:HttpClient) { }

  getAllCompagnies():Observable<Array<Compagnie>>{
    return this.http.get<Array<Compagnie>>("http://localhost:8082/admin/compagnies");
  }
  saveCompagnie(compagnieName: string) : Observable<any> {
    const compagnie = { compagnieName };
    return this.http.post<any>("http://localhost:8082/admin/add-compagnie",compagnie);
  }
  updateCompagnie(id: number, compagnieName: string): Observable<any> {
    const compagnie = { id, compagnieName };
    return this.http.post<any>("http://localhost:8082/admin/compagnie/update", compagnie);
  }

  deleteCompagnie(compagnie:Compagnie): Observable<any> {
    return this.http.post<any>("http://localhost:8082/admin/compagnie/delete",compagnie);
  }
  addCompagnieToAeroport(aeroportName: string, compagnieName: string) :Observable<any>{
    const data={aeroportName,compagnieName};
    return this.http.post<any>("http://localhost:8082/admin/add-compagnieToAeroport",data)
  }
  removeCompagnieToAeroport(aeroportName: string, compagnieName: string) :Observable<any>{
    const data={aeroportName,compagnieName};
    return this.http.post<any>("http://localhost:8082/admin/remove-compagnieToAeroport",data)
  }
}
