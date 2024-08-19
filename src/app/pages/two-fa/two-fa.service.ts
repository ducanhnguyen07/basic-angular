import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TwoFaService {
  urlEnable2FA: string = `${environment.apiUrl}/auth/enable/2fa`;
  urlGen2FA: string = `${environment.apiUrl}/auth/two-fa/url`;

  constructor(
    private readonly _http: HttpClient,
  ) {}

  handle2fa(password: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.urlEnable2FA, JSON.stringify(password), { headers }).pipe();
  }

  handlGen2FA(): Observable<any> {
    return this._http.get<any>(this.urlGen2FA).pipe();
  }
}