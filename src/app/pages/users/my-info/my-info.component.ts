import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MyInfoService } from './my-info.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrl: './my-info.component.scss',
  providers: [MessageService],
})
export class MyInfoComponent {
  myInfo: any = {};

  constructor(
    private myInfoService: MyInfoService,
    private router: Router,
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.handleGetInfo();
  }
  
  handleGetInfo() {
    this.myInfoService.getInfo().subscribe((res: any) => {
      this.myInfo = res.data;
    });
  }

  onUpload(event: any) {
    console.log(event)
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Basic Mode',
    });
  }

}
