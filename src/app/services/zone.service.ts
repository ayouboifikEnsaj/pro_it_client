import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Zone} from "../models/model/model.module";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  constructor(private http:HttpClient) { }

  getAllZones(): Observable<Array<Zone>> {
    return this.http.get<Array<Zone>>("http://localhost:8082/admin/zones");
  }


  saveZone(zoneName: string) : Observable<any> {
    const zone = { zoneName};
    return this.http.post<any>("http://localhost:8082/admin/add-zone",zone);
  }

  updateZone(id: number, zoneName: string): Observable<any> {
    const zone = { id,zoneName };
    return this.http.post<any>("http://localhost:8082/admin/zone/update", zone);
  }

  deleteZone(zone:Zone): Observable<any> {
    return this.http.post<any>("http://localhost:8082/admin/zone/delete",zone);
  }
}
