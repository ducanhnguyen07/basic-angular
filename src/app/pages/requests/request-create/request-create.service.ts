import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class RequestCreateService {
  url: string = `${environment.apiUrl}/requests/create`;

  constructor(
    private _http: HttpClient,
  ) {}

  postCreateRequest(newRequest: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<any>(this.url, JSON.stringify(newRequest), { headers });
  }
}