import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RequestCreateService } from './request-create.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrl: './request-create.component.scss'
})
export class RequestCreateComponent {
  objType: string = "";
  requestType: Array<string> = [
    'OFF',
    'REMOTE',
    'ONSITE',
    'LATE',
    'EARLY',
  ];

  typeControl = new FormControl<any | null>(null, Validators.required);

  newRequest: any = {
    note: '',
    type: 0,
    requestDay: new Date(),
    time: 0,
  };

  isSuccess: boolean = false;
  callback: Function | undefined;
  
  constructor(
    private requestCreateService: RequestCreateService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) {
    this.callback = this.config.data?.callback;
    this.newRequest.requestDay = this.config.data?.date;
  }

  onSubmit() {
    const index = this.requestType.findIndex(type => type === this.objType);
    this.newRequest.type = index;
    
    this.requestCreateService.postCreateRequest(this.newRequest).subscribe(
      (response) => {
        this.isSuccess = true;
        if(this.callback) {
          this.callback(this.isSuccess);
        }
        this.ref.close();
        console.log(response);
      },
      (error) => {
        if(this.callback) {
          this.callback(this.isSuccess);
        }
        this.ref.close();
        console.error(error);
      }
    );
  }
}
