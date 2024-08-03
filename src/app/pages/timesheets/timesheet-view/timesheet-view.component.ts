import { Component } from '@angular/core';
import { TimesheetViewService } from './timesheet-view.service';
import { Router } from '@angular/router';
import { TimesheetCreateComponent } from '../timesheet-create/timesheet-create.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { format } from 'date-fns';

@Component({
  selector: 'app-timesheet-view',
  templateUrl: './timesheet-view.component.html',
  styleUrl: './timesheet-view.component.scss',
  providers: [DialogService, MessageService],
})
export class TimesheetViewComponent {
  data: Array<any> = [];
  workingTime: number = 0;

  ref: DynamicDialogRef | undefined;

  currDate: string = '';

  viewDate: Date = new Date();
  dayOfWeek: { day: string, dayNum: number }[] = [
    { day: "Monday", dayNum: 0 },
    { day: "Tuesday", dayNum: 1 },
    { day: "Wednesday", dayNum: 2 },
    { day: "Thursday", dayNum: 3 },
    { day: "Friday", dayNum: 4 },
    { day: "Saturday", dayNum: 5 },
    { day: "Sunday", dayNum: 6 },
  ];

  monthVal: { date: number, dOW: string }[] = [
    { date: 1, dOW: 'Mon' },
    { date: 2, dOW: 'Tue' },
    { date: 3, dOW: 'Wed' },
    { date: 4, dOW: 'Thu' },
    { date: 5, dOW: 'Fri' },
    { date: 6, dOW: 'Sat' },
    { date: 7, dOW: 'Sun' },
    { date: 8, dOW: 'Mon' },
    { date: 9, dOW: 'Tue' },
    { date: 10, dOW: 'Wed' },
    { date: 11, dOW: 'Thu' },
    { date: 12, dOW: 'Fri' },
    { date: 13, dOW: 'Sat' },
    { date: 14, dOW: 'Sun' },
  ]; 

  constructor(
    private router: Router,
    private timesheetViewService: TimesheetViewService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.currDate = format(new Date(), 'yyyy/MM/dd');
    this.getOwnTimesheet();
    this.timesheetViewService.getWorkingTime().subscribe((res: any) => {
      this.workingTime = res.data;
    });
  }

  getOwnTimesheet() {
    this.timesheetViewService.getOwnTimesheet().subscribe((res: any) => {
      this.data = res.data;
    });
  }

  editTimesheet(timesheetId: string) {
    this.router.navigate(['/timesheets/edit', timesheetId]);
  }

  showDialog() {
    this.dialogService.open(TimesheetCreateComponent, {
      header: 'New timesheet',
      width: '30vw',
      draggable: true,
      data: {
        callback: (isSuccess: boolean) => this.showToast(isSuccess),
      },
    });
  }

  showToast(isSuccess: boolean) {
    if (isSuccess) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Create new timesheet success!',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Create new timesheet fail!',
      });
    }
  }
}
