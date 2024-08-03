import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class RolePermissionService {
  urlPermission: string = `${environment.apiUrl}/users/role/own-permission`;

  constructor(
    private _http: HttpClient,
  ) {}

  getPermissionList(): Observable<any> {
    return this._http.get<any>(this.urlPermission).pipe();
  }
}