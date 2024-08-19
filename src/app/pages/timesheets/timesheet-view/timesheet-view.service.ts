import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class TimesheetViewService {
  url: string = `${environment.apiUrl}/timesheets/own-timesheet`;
  urlWorkingTime: string = `${environment.apiUrl}/users/working-time/my-working-time/get-time`;
  urlCheckIn: string = `${environment.apiUrl}/users/attend/check-in`;

  constructor(
    private _http: HttpClient,
  ) {}

  getOwnTimesheet(): Observable<any> {
    return this._http.get<any>(this.url).pipe();
  }

  getWorkingTime(): Observable<any> {
    return this._http.get<any>(this.urlWorkingTime).pipe();
  }

  handleCheckIn(checkInToken: { checkInToken: string }): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<any>(this.urlCheckIn, JSON.stringify(checkInToken), { headers });
  }
}