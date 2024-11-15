import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataImportService {

  private uploadUrl = 'http://localhost:8082/admin'; // Update with your actual backend URL

  constructor(private http: HttpClient) {
  }

  compagnieUploadExcel(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(this.uploadUrl + "/compagnie/upload", formData, {
      headers: new HttpHeaders({
        // If you need to add any specific headers
      }),
      responseType: 'text' // or 'json' if your API returns JSON
    });
  }

  airportUploadExcel(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(this.uploadUrl + "/aeroport/upload", formData, {
      headers: new HttpHeaders({
        // If you need to add any specific headers
      }),
      responseType: 'text' // or 'json' if your API returns JSON
    });
  }


  usersUploadExcel(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(this.uploadUrl + "/upload-users", formData, {
      headers: new HttpHeaders({
        // If you need to add any specific headers
      }),
      responseType: 'text' // or 'json' if your API returns JSON
    });
  }

  problemsUploadExcel(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(this.uploadUrl + "/upload-problems", formData, {
      headers: new HttpHeaders({
        // If you need to add any specific headers
      }),
      responseType: 'text' // or 'json' if your API returns JSON
    });
  }

  solutionsUploadExcel(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(this.uploadUrl + "/upload-solutions", formData, {
      headers: new HttpHeaders({
        // If you need to add any specific headers
      }),
      responseType: 'text' // or 'json' if your API returns JSON
    });
  }

  zonesUploadExcel(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(this.uploadUrl + "/upload-zones", formData, {
      headers: new HttpHeaders({
        // If you need to add any specific headers
      }),
      responseType: 'text' // or 'json' if your API returns JSON
    });
  }

  equipmentUploadExcel(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(this.uploadUrl + "/upload-equipment", formData, {
      headers: new HttpHeaders({
        // If you need to add any specific headers
      }),
      responseType: 'text' // or 'json' if your API returns JSON
    });
  }

  comptoireUploadExcel(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(this.uploadUrl + "/upload-comptoire", formData, {
      headers: new HttpHeaders({
        // If you need to add any specific headers
      }),
      responseType: 'text' // or 'json' if your API returns JSON
    });
  }

  interventionUploadExcel(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(this.uploadUrl + "/upload-intervention", formData, {
      headers: new HttpHeaders({
        // If you need to add any specific headers
      }),
      responseType: 'text' // or 'json' if your API returns JSON
    });
  }
}
