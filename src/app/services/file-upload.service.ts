import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = 'http://localhost:8082/admin/upload'; 

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<File> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<File>(this.baseUrl, formData);
  }
}
