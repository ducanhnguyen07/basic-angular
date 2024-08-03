import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RoleService {
  urlRole: string = `${environment.apiUrl}/roles/all-role`;
  urlRoleUser: string = `${environment.apiUrl}/roles/role/role-permission`;
  urlUpdate: string = `${environment.apiUrl}/roles/role/change-permission`;

  constructor(private _http: HttpClient) {}

  getRole(): Observable<any> {
    return this._http.get<any>(this.urlRole).pipe();
  }

  getRoleUser(): Observable<any> {
    return this._http.get<any>(this.urlRoleUser).pipe();
  }

  postRoleUser(newUserList: Array<any>): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<any>(this.urlUpdate, JSON.stringify(newUserList), {
      headers,
    });
  }
}
