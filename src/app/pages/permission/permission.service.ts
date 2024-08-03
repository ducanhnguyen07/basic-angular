import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class PermissionService {
  baseUrl: string = `${environment.apiUrl}/roles/permissions`;

  constructor(private _http: HttpClient) {}

  getPermissionById(id: string): Observable<any>  {
    const url = `${this.baseUrl}/${id}`;
    return this._http.get<any>(url).pipe();
  }
}