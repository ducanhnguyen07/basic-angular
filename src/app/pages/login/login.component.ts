import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import moment from 'moment';
import { jwtDecode } from 'jwt-decode';
import { branchList } from '../../../common/constant/branch-list';
import { FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],
})
export class LoginComponent {
  newUser: any = {};
  visible: boolean = false;
  visible2FA: boolean = false; 

  verifyOtp: string = '';
  isVerify: boolean = false;

  branchList: string[] = branchList;
  branchControl = new FormControl<any | null>(null, Validators.required);

  constructor(
    private authSevice: AuthService,
    private router: Router,
    private readonly messageService: MessageService
  ) {}

  handleLogin(data: any) {
    this.authSevice.login(data.em, data.pw).subscribe(
      (res: any) => {
        // check if 2FA enable
        const d = JSON.parse(res);
        const decodedToken = jwtDecode<{
          "sub": string,
          "iss": string,
          "id": string,
          "email": string,
          "roles": number,
          "iat": number,
          "exp": number,
          "isActive": boolean
        }>(d.data.accessToken);

        if(decodedToken.isActive) {
          this.visible2FA = true;
        } else {
          localStorage.setItem('is2FAValidated', 'false');
          this.router.navigate(['/']);
        }
      },
      (error) => {
        console.log('oops', error);
        this.router.navigateByUrl('/login');
      }
    );
  }

  handleVerify2FA() {
    const obj2FA = {
      otp2FACode: this.verifyOtp,
    };

    this.authSevice.handleLogin2FA(obj2FA).subscribe(
      (res: any) => {
        if (res.data.isLogin) {
          this.visible2FA = false;
          this.router.navigateByUrl('/');
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Invalid 2FA code!',
          });
        }
      },
      (error) => {
        console.log('Error verifying 2FA', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to verify 2FA!',
        });
      }
    );
  }

  showCheckInDialog() {
    this.visible = true;
  }

  registerNewUser() {
    this.visible = false;
    this.authSevice.registerNewUser(this.newUser).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Create user successful!',
        });
        console.log('User created successfully', response);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Create user fail!',
        });
        console.error('Error creating user', error);
      }
    );
    this.newUser = {};
  }
}
