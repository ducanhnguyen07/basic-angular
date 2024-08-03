import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ExportExcelService {
  url: string = `${environment.apiUrl}/users/excels/export/all-users`;

  constructor(
    private _http: HttpClient,
  ) {}

  exportExcelFile(): Observable<Blob> {
    return this._http.get(this.url, { responseType: 'blob' }).pipe();
  }
}