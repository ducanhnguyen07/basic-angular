import { Component } from '@angular/core';
import { TwoFaService } from './two-fa.service';
import { MessageService } from 'primeng/api';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-two-fa',
  templateUrl: './two-fa.component.html',
  styleUrls: ['./two-fa.component.scss'],
  providers: [MessageService],
})
export class TwoFaComponent {
  password: string = '';
  visible: boolean = false;
  qrCode: string = '';
  otp2FA: string = '';
  isActive: boolean = false;

  constructor(
    private twoFaService: TwoFaService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken != null) {
      const decodedToken = jwtDecode<{
        "sub": string,
        "iss": string,
        "id": string,
        "email": string,
        "roles": number,
        "iat": number,
        "exp": number,
        "isActive": boolean
      }>(accessToken);
      
      this.isActive = decodedToken.isActive;
    }
    
  }

  handle2FA() {
    this.twoFaService.handle2fa({ password: this.password }).subscribe(
      (response) => {
        if (response.data.isValid) {
          this.enable2FA();
        } else {
          this.showError('Enable 2FA failed!');
        }
      },
      (error) => {
        this.showError('Enable 2FA failed!');
        console.error('Error enabling 2FA', error);
      }
    );
  }

  enable2FA() {
    this.visible = true;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Enable 2FA successful!',
    });

    this.twoFaService.handlGen2FA().subscribe(
      (res: any) => {
        this.qrCode = res.data.qrCode;
        this.otp2FA = res.data.secretKey;
      },
      (error) => {
        this.showError('Failed to generate 2FA details!');
        console.error('Error generating 2FA details', error);
      }
    );
  }

  showError(detail: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail,
    });
  }
}
