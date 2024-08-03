import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ImportExcelService {
  url: string = `${environment.apiUrl}/users/excels/import/all-users`;

  constructor(
    private _http: HttpClient,
  ) {}

  importExcelFile(formData: FormData): Observable<any> {
    return this._http.post<any>(this.url, formData);
  }
}