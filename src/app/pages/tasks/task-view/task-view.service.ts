import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class TaskViewService {
  url: string = `${environment.apiUrl}/tasks`;

  constructor(
    private _http: HttpClient,
  ) {}

  getAllTask(): Observable<any> {
    return this._http.get<any>(this.url).pipe();
  }
}