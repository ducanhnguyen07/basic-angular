import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class UserViewService {
  url: string = `${environment.apiUrl}/users/all-users`;

  constructor(
    private _http: HttpClient,
  ) {}

  getUserList(): Observable<any> {
    return this._http.get<any>(this.url).pipe();
  }
}