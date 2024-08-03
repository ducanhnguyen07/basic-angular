import { Component } from '@angular/core';
import { AllRequestService } from './all-request.service';
import { MessageService } from 'primeng/api';
import { format } from 'date-fns';

@Component({
  selector: 'app-all-request',
  templateUrl: './all-request.component.html',
  styleUrl: './all-request.component.scss',
  providers: [MessageService],
})
export class AllRequestComponent {
  data: Array<any> = [];
  updateRequest: any = {};

  constructor(
    private allRequestService: AllRequestService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getAllRequest();
  }

  getAllRequest() {
    this.allRequestService.getAllRequest().subscribe((res: any) => {
      this.data = res.data;
      for (const req of this.data) {
        req.requestDay = format(new Date(req.requestDay), 'dd/MM/yyyy');
      }
    });
  }

  approveRequest(requestId: string) {
    this.updateRequest['status'] = 1;
    this.allRequestService
      .postUpdateRequest(this.updateRequest, requestId)
      .subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Request approved!',
          });
          console.log(response);
        },
        (error) => {
          console.log(this.updateRequest);
          console.error(error);
        }
      );
  }

  rejectRequest(requestId: string) {
    this.updateRequest['status'] = 2;
    this.allRequestService
      .postUpdateRequest(this.updateRequest, requestId)
      .subscribe(
        (response) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Success',
            detail: 'Request rejected!',
          });
          console.log(response);
        },
        (error) => {
          console.log(this.updateRequest);
          console.error(error);
        }
      );
  }
}
