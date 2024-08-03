import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICreateUser } from "../../../../common/interface/create-user.interface";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class UserEditService {
  url: string = `${environment.apiUrl}/users`;

  constructor(
    private _http: HttpClient,
  ) {}

  getUserById(userId: string | null) {
    return this._http.get<any>(`${this.url}/${userId}`);
  }

  editUser(userId: string, userData: Partial<ICreateUser>): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.patch<any>(`${this.url}/update/${userId}`,  JSON.stringify(userData), { headers });
  }
}