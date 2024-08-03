import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}

@Injectable({ providedIn: 'root' })
export class MyInfoService {
  url: string = `${environment.apiUrl}/users/profile/info?info=true`;
  urlUploadImg: string = `${environment.apiUrl}/users/upload-avatar`;

  constructor(private _http: HttpClient) {}

  getInfo(): Observable<any> {
    return this._http.get<any>(this.url).pipe();
  }
}
