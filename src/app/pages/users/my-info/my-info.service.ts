import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MyInfoService {
  url: string = `${environment.apiUrl}/users/profile/info?info=true`;
  urlUploadImg: string = `${environment.apiUrl}/users/upload-avatar`;
  url2FA: string = `${environment.apiUrl}/auth/two-fa/url`;

  constructor(private _http: HttpClient) {}

  getInfo(): Observable<any> {
    return this._http.get<any>(this.url).pipe();
  }

  // handle2FASecret(): Observable<any> {
  //   return this._http.get<any>(this.url2FA).pipe();
  // }
}
