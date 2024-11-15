import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AppRole, appUser} from '../models/model/model.module';
import { Observable } from 'rxjs';
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
  private baseUrl = 'http://localhost:8082/users';
  constructor(private http:HttpClient) { }
  getAllUsers():Observable<Array<appUser>>{
    return this.http.get<Array<appUser>>("http://localhost:8082/users");

  }
  getAllRoles():Observable<Array<AppRole>>{
    return this.http.get<Array<AppRole>>("http://localhost:8082/role");
  }

  getAllUsersWithRole(role: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/role/${role}`);
  }
  getAllUsersWithRoleAndAeroport(role: string, aeroport: string): Observable<any[]> {
    const params = new HttpParams()
      .set('role', role)
      .set('aeroport', aeroport);

    return this.http.get<any[]>(`${this.baseUrl}/role/aeroport`, { params });
  }
  getAeroport(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/aeroport/${username}`);
  }

  deleteUser(id:number) {

  }

  updateUser(user: any):Observable<any> {
    return this.http.post(`${this.baseUrl}/update`, user);
  }


  addUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, user);
  }

}
