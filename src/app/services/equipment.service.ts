import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {EquipmentDTO} from "../models/model/model.module";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private http: HttpClient) { }
  private apiUrl ="http://localhost:8082/admin/";
  getAllEquipments(): Observable<EquipmentDTO[]> {
    return this.http.get<EquipmentDTO[]>(this.apiUrl+"equipments");
  }
  getAllEquipmentss():Observable<Array<EquipmentDTO>>{
    return this.http.get<Array<EquipmentDTO>>("http://localhost:8082/admin/equipmentss");
  }

  addOrUpdateEquipment(equipment: EquipmentDTO): Observable<EquipmentDTO> {
    return this.http.post<EquipmentDTO>(this.apiUrl+"equipement", equipment);
  }

  deleteEquipment(equipment: EquipmentDTO): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl+"equipment/delete",equipment);
  }
}
