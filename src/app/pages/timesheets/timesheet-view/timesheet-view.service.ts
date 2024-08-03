import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class TimesheetViewService {
  url: string = `${environment.apiUrl}/timesheets/own-timesheet`;
  urlWorkingTime: string = `${environment.apiUrl}/users/working-time/my-working-time/get-time`;

  constructor(
    private _http: HttpClient,
  ) {}

  getOwnTimesheet(): Observable<any> {
    return this._http.get<any>(this.url).pipe();
  }

  getWorkingTime(): Observable<any> {
    return this._http.get<any>(this.urlWorkingTime).pipe();
  }
}