import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class PaginationService {
  url: string = `${environment.apiUrl}/users`;
  
  constructor(private _http: HttpClient) {}

  getTotalPages(): Observable<any> {
    return this._http.get<any>(this.url).pipe();
  }

  requestApi(currentPage: number): string {
    const api: string = `${this.url}?page=${currentPage + 1}`;
    return api;
  }
}