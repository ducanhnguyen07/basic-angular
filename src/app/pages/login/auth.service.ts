import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  tap,
} from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { response } from 'express';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  url: string = `${environment.apiUrl}/auth/login`;
  refreshUrl: string = `${environment.apiUrl}/auth/refresh`;
  registerUrl: string = `${environment.apiUrl}/auth/register`;
  verify2FAUrl: string = `${environment.apiUrl}/auth/login/2fa`;

  private jwt: JwtHelperService;

  constructor(
    private _http: HttpClient,

    @Inject(DOCUMENT)
    private document: Document,

    private cookieService: CookieService,
    private router: Router,
  ) {
    this.jwt = new JwtHelperService();
  }

  private isLoggedInSubject = new BehaviorSubject<boolean>(
    this.checkLoginStatus()
  );

  isLoggedIn = this.isLoggedInSubject.asObservable();

  login(em: string = '', password: string = '') {
    const userInfo = { email: em, password: password };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http
      .post(this.url, JSON.stringify(userInfo), {
        headers: headers,
        responseType: 'text',
      })
      .pipe(
        tap((res: any) => {
          const objJsonRes = JSON.parse(res);
          const decodedToken = jwtDecode<{
            "sub": string,
            "iss": string,
            "id": string,
            "email": string,
            "roles": number,
            "iat": number,
            "exp": number,
            "isActive": boolean
          }>(objJsonRes.data.accessToken);

          localStorage.setItem('accessToken', objJsonRes.data.accessToken);
          const expiresAt = new Date();
          expiresAt.setTime(expiresAt.getTime() + (7 * 24 * 60 * 60 * 1000));
          this.cookieService.set('refreshToken', objJsonRes.data.refreshToken, expiresAt);

          this.isLoggedInSubject.next(!decodedToken.isActive);
        })
      );
  }

  private checkLoginStatus(): boolean {
    let localStorage = this.document.defaultView?.localStorage;
    if (!localStorage) {
      return false;
    }

    const refreshToken = this.cookieService.get('refreshToken');
    return refreshToken !== null;
  }

  isLogined() {
    return this.isLoggedIn;
  }

  logout() {
    this.isLoggedInSubject.next(false);

    this.cookieService.delete('refreshToken');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_email');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('is2FAValidated');
  }

  refreshAccessToken(): Observable<any> {
    return this._http
      .get<any>(this.refreshUrl, { withCredentials: true, })
      .pipe(
        tap((response: any) => {
          const newAccessToken = response.data['accessToken'];
          localStorage.setItem('accessToken', newAccessToken);

          this.isLoggedInSubject.next(true);
        },
        () => {
          this.isLoggedInSubject.next(false);
        }
      )
    );
  }

  registerNewUser(newUser: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<any>(this.registerUrl, JSON.stringify(newUser), { headers }).pipe();
  }

  handleLogin2FA(obj2FA: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post<any>(this.verify2FAUrl, JSON.stringify(obj2FA), { headers }).pipe(
      tap((res) => {
        if (res.data.isLogin) {
          localStorage.setItem('is2FAValidated', 'true');

          this.isLoggedInSubject.next(true);
        }
      })
    );
  }  
}
