import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AllRequestService {
  url: string = `${environment.apiUrl}/requests`;
  urlUpdate: string = `${environment.apiUrl}/requests/update`;

  constructor(
    private _http: HttpClient,
  ) {}

  getAllRequest(): Observable<any> {
    return this._http.get<any>(this.url).pipe();
  }

  postUpdateRequest(updateRequest: any, requestId: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.patch<any>(
      `${this.urlUpdate}/${requestId}`,
      JSON.stringify(updateRequest),
      { headers }
    ); 
  }
}