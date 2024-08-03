import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICreateUser } from "../../../../common/interface/create-user.interface";
import { Observable, catchError, map, throwError } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class UserCreateService {
  url: string = `${environment.apiUrl}/users/create`;
  newUser: ICreateUser = {
    name: "",
    email: "",
    password: "",
    address: "",
    gender: "",
    branch: 0,
    role: 0,
  };

  constructor(
    private _http: HttpClient,
  ) {}

  createUser(newUser: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<any>(this.url, JSON.stringify(newUser), { headers }).pipe(
      map(response => response.data), // Lấy dữ liệu từ thuộc tính 'data'
      catchError(error => { 
        // Xử lý lỗi 
        console.error('Lỗi:', error);
        return throwError('Lỗi khi lấy timesheet');
      })
    );
  }
}