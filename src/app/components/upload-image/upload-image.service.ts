import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}

@Injectable({ providedIn: 'root' })
export class UploadImageService {
  url: string = "http://localhost:3000/v1/users/upload-avatar";

  constructor(private _http: HttpClient) {}

  public uploadImage(file: File): Observable<Response> {
    const formData = new FormData();
    formData.append('file', file);

    return this._http.post<any>(this.url, formData);
  }
}
