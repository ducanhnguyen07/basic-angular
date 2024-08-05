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

@Injectable({ providedIn: 'root' })
export class AuthService {
  url: string = `${environment.apiUrl}/auth/login`;
  refreshUrl: string = `${environment.apiUrl}/auth/refresh`;
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

          const expiresAt = new Date();
          expiresAt.setTime(expiresAt.getTime() + (7 * 24 * 60 * 60 * 1000));
          this.cookieService.set('refreshToken', objJsonRes.data.refreshToken, expiresAt);

          this.isLoggedInSubject.next(true);
          // save data
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
  }

  refreshAccessToken(): Observable<any> {
    return this._http
      .get<any>(this.refreshUrl, { withCredentials: true, })
      .pipe(
        tap((response: any) => {
          const newAccessToken = response.data['accessToken'];
          localStorage.setItem('accessToken', newAccessToken);

          const expiresAt = new Date();
          expiresAt.setTime(expiresAt.getTime() + (7 * 24 * 60 * 60 * 1000));

          this.cookieService.set('refreshToken', response.data['refreshToken'], expiresAt);

          this.isLoggedInSubject.next(true);
        },
        () => {
          this.isLoggedInSubject.next(false);
        }
      )
    );
  }
}
