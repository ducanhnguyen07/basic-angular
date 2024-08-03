import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class TaskCreateService {
  url: string = `${environment.apiUrl}/tasks/create`;
  newTask: any = {};

  constructor(
    private _http: HttpClient,
  ) {}

  postCreateTask(newTask: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<any>(this.url, JSON.stringify(newTask), { headers });
  }
}