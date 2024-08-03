import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICreateUser } from "../../../../common/interface/create-user.interface";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class UserReadService {
  url: string = `${environment.apiUrl}/users`;
  page: number = 1;

  constructor(private _http: HttpClient) {}

  getAllUsers () {
    const urlWithParams = `${this.url}?page=${this.page}`;
    return this._http.get<any>(urlWithParams).pipe();
  }

  getDataFromUrl(url: string): Observable<any> {
    return this._http.get<any>(url);
  }  
}