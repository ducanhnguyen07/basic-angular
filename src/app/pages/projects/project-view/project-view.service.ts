import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ProjectViewService {
  url: string = `${environment.apiUrl}/projects/`;

  constructor(
    private _http: HttpClient,
  ) {}

  getAllProject(): Observable<any> {
    return this._http.get<any>(this.url).pipe();
  }
}