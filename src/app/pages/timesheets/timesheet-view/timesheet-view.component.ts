import { Component, SimpleChanges } from '@angular/core';
import { TimesheetViewService } from './timesheet-view.service';
import { Router } from '@angular/router';
import { TimesheetCreateComponent } from '../timesheet-create/timesheet-create.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import {
  addDays,
  format,
  getDaysInMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

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

  currDate: Date = new Date(Date.now());

  viewDate: Date = new Date();
  startOfWeekDate: Date = startOfWeek(this.viewDate, { weekStartsOn: 1 });

  dayOfWeek: {
    day: string;
    dayNum: number;
    date: Date;
    workingTime?: string;
  }[] = [
    { day: 'Monday', dayNum: 0, date: addDays(this.startOfWeekDate, 0) },
    { day: 'Tuesday', dayNum: 1, date: addDays(this.startOfWeekDate, 1) },
    { day: 'Wednesday', dayNum: 2, date: addDays(this.startOfWeekDate, 2) },
    { day: 'Thursday', dayNum: 3, date: addDays(this.startOfWeekDate, 3) },
    { day: 'Friday', dayNum: 4, date: addDays(this.startOfWeekDate, 4) },
    { day: 'Saturday', dayNum: 5, date: addDays(this.startOfWeekDate, 5) },
    { day: 'Sunday', dayNum: 6, date: addDays(this.startOfWeekDate, 6) },
  ];

  monthVal: { date: number; dOW: string }[] = [];

  constructor(
    private router: Router,
    private timesheetViewService: TimesheetViewService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {
    const dayOfWeek = format(startOfMonth(this.currDate), 'EEEE');
    const firstIdx: number = this.dayOfWeek.findIndex(
      (item) => item.day == dayOfWeek
    );
    this.monthVal.push({
      date: 1,
      dOW: this.dayOfWeek[firstIdx].day.slice(0, 3),
    });

    for (let i = 2; i <= getDaysInMonth(this.currDate); i++) {
      const dOW: string = this.dayOfWeek[(firstIdx + i - 1) % 7].day.slice(
        0,
        3
      );
      this.monthVal.push({ date: i, dOW: dOW });
    }
  }

  ngOnInit() {
    this.currDate = new Date(Date.now());
    this.getOwnTimesheet();
    this.timesheetViewService.getWorkingTime().subscribe((res: any) => {
      this.workingTime = res.data;
    });
  }

  onTabChange(event: any) {
    if (event >= 0 && event < 7) this.currDate = this.dayOfWeek[event]['date'];

    this.calculateWorkingTimePerDay();
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['viewDate']) {
  //     this.updateDaysOfWeek();
  //   }
  // }

  // updateDaysOfWeek() {
  //   const startOfWeekDate = startOfWeek(this.viewDate, { weekStartsOn: 1 });
  //   this.dayOfWeek = [
  //     { day: "Monday", dayNum: 0, date: addDays(startOfWeekDate, 0) },
  //     { day: "Tuesday", dayNum: 1, date: addDays(startOfWeekDate, 1) },
  //     { day: "Wednesday", dayNum: 2, date: addDays(startOfWeekDate, 2) },
  //     { day: "Thursday", dayNum: 3, date: addDays(startOfWeekDate, 3) },
  //     { day: "Friday", dayNum: 4, date: addDays(startOfWeekDate, 4) },
  //     { day: "Saturday", dayNum: 5, date: addDays(startOfWeekDate, 5) },
  //     { day: "Sunday", dayNum: 6, date: addDays(startOfWeekDate, 6) },
  //   ];
  // }

  getOwnTimesheet() {
    this.timesheetViewService.getOwnTimesheet().subscribe((res: any) => {
      this.data = res.data;
      this.calculateWorkingTimePerDay();
    });
  }

  calculateWorkingTimePerDay() {
    this.dayOfWeek.forEach((day) => {
      const workingTime = this.data
        .filter((timesheet) =>
          this.isSameDay(timesheet.timesheet.logTime, day.date)
        )
        .reduce((sum, timesheet) => sum + timesheet.timesheet.workingTime, 0);
      day.workingTime = `${workingTime.toString().padStart(2, '0')}:00`;
    });
  }

  getWorkingTimeByDay(date: number) {
    const dateString = new Date(
      this.viewDate.getFullYear(),
      this.viewDate.getMonth(),
      date
    ).toLocaleDateString();

    const timesheet = this.data.find(
      (item) => new Date(item.timesheet.logTime).toLocaleDateString() === dateString 
    );

    return timesheet ? timesheet.timesheet.workingTime : 0;
  }

  editTimesheet(timesheetId: string) {
    this.router.navigate(['/timesheets/edit', timesheetId]);
  }

  showDialog(date: Date) {
    this.dialogService.open(TimesheetCreateComponent, {
      header: 'New timesheet',
      width: '30vw',
      draggable: true,
      data: {
        callback: (isSuccess: boolean) => this.showToast(isSuccess),
        date: date,
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

  isSameDay(date1: string | Date, date2: string | Date): boolean {
    const formattedDate1 = format(new Date(date1), 'yyyy-MM-dd');
    const formattedDate2 = format(new Date(date2), 'yyyy-MM-dd');

    return formattedDate1 === formattedDate2;
  }
}
