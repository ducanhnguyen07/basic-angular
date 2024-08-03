import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AllTimesheetService {
  url: string = `${environment.apiUrl}/timesheets`;
  urlUpdate: string = `${environment.apiUrl}/timesheets/update`;

  constructor(private _http: HttpClient) {}

  getAllTimesheet(): Observable<any> {
    return this._http.get<any>(this.url).pipe();
  }

  updateTimesheet(updateTimesheetData: any, timesheetId: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.patch<any>(
      `${this.urlUpdate}/${timesheetId}`,
      JSON.stringify(updateTimesheetData),
      { headers }
    );
  }
}
