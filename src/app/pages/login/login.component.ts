import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import moment from 'moment';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private authSevice: AuthService, private router: Router) {}

  handleLogin(data: any) {
    this.authSevice.login(data.em, data.pw).subscribe(
      (res: any) => {
        const d = JSON.parse(res);

        const decodedToken = jwtDecode<{
          "sub": string,
          "iss": string,
          "id": string,
          "email": string,
          "roles": number,
          "iat": number,
          "exp": number
        }>(d.data.accessToken);

        const expiresAt = moment().add(decodedToken.exp, 'second');

        localStorage.setItem('accessToken', d.data.accessToken);
        localStorage.setItem('user_id', decodedToken.id);
        localStorage.setItem('user_email', decodedToken.email);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

        this.router.navigateByUrl('/');
      },
      (error) => {
        console.log('oops', error);
        this.router.navigateByUrl('/login');
      }
    );
  }
}
