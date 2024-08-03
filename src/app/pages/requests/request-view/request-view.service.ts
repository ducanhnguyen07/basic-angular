import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class RequestViewService {
  url: string = `${environment.apiUrl}/requests/own-request/all`;

  constructor(
    private _http: HttpClient,
  ) {}

  getOwnRequest(): Observable<any> {
    return this._http.get<any>(this.url).pipe();
  }
}