import { Component } from '@angular/core';
import { AllTimesheetService } from './all-timesheet.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-all-timesheet',
  templateUrl: './all-timesheet.component.html',
  styleUrl: './all-timesheet.component.scss',
  providers: [MessageService],
})
export class AllTimesheetComponent {
  data: Array<any> = [];
  updateTimesheet: any = {};

  constructor(
    private allTimesheetService: AllTimesheetService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.getAllTimesheet();
  }

  getAllTimesheet() {
    this.allTimesheetService.getAllTimesheet().subscribe((res: any) => {
      this.data = res.data;
    });
  }

  approveTimesheet(timesheetId: string) {
    this.updateTimesheet['status'] = 1;
    this.allTimesheetService.updateTimesheet(this.updateTimesheet, timesheetId).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Timesheet approved!',
        });
        console.log(response);
      },
      (error) => {
        console.log(this.updateTimesheet);
        console.error(error);
      },
    );
  }

  rejectTimesheet(timesheetId: string) {
    this.updateTimesheet['status'] = 2;
    this.allTimesheetService.updateTimesheet(this.updateTimesheet, timesheetId).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Alert',
          detail: 'Timesheet rejected!',
        });
        console.log(response);
      },
      (error) => {
        console.log(this.updateTimesheet);
        console.error(error);
      },
    );
  }

}
