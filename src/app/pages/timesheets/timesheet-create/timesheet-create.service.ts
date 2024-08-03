import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class TimesheetCreateService {
  url: string = `${environment.apiUrl}/timesheets/create`;
  urlTaskList: string = `${environment.apiUrl}/tasks/own-task`;

  constructor(
    private _http: HttpClient,
  ) {}

  postCreateTimesheet(newTimesheet: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<any>(this.url, JSON.stringify(newTimesheet), { headers });
  }

  getAllTask(): Observable<any> {
    return this._http.get<any>(this.urlTaskList).pipe();
  }
}