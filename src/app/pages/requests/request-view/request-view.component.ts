import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RequestViewService } from './request-view.service';
import { RequestCreateComponent } from '../request-create/request-create.component';
import { DialogService } from 'primeng/dynamicdialog';
import { addDays, endOfMonth, format, startOfDay, subDays } from 'date-fns';
import { MessageService } from 'primeng/api';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-request-view',
  templateUrl: './request-view.component.html',
  styleUrl: './request-view.component.scss',
  providers: [DialogService, MessageService],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestViewComponent {
  data: Array<any> = [];
  user: any = {};

  view: CalendarView = CalendarView.Month
  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  currMonth: number = new Date().getMonth() + 1;
  requestsPerMonth: any[] = [];

  constructor(
    private requestViewService: RequestViewService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getOwnRequest();
  }

  handleClick(date: Date) {
    if (this.isSunday(date) || !this.isSameMonth(date)) {
      return;
    }
    this.dialogService.open(RequestCreateComponent, {
      header: `New request: ${format(new Date(date), 'dd/MM/yyyy')}`,
      width: '30vw',
      draggable: true,
      data: {
        callback: (isSuccess: boolean) => this.showToast(isSuccess),
        date: date,
      },
    });
  }

  getOwnRequest() {
    this.requestViewService.getOwnRequest().subscribe((res: any) => {
      this.data = res.data.responseRequestList;
      for (const req of this.data) {
        req.requestDay = format(new Date(req.requestDay), 'dd/MM/yyyy');
        const parts = req.requestDay.split('/');
        const reqMonth = parseInt(parts[1], 10);

        req.type = req.type[0].toUpperCase() + req.type.toLowerCase().slice(1);

        if(reqMonth === this.currMonth) {
          this.requestsPerMonth.push(req);
        }
      }

      this.user = res.data.responseUser;
    });
  }

  showToast(isSuccess: boolean) {
    if (isSuccess) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Create task successful!',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Create task fail!',
      });
    }
  }

  isSameDay(date1: string, date2: Date): boolean {
    const d2 = format(new Date(date2), 'dd/MM/yyyy');
    return date1 === d2;
  }

  isSunday(date: Date) {
    const day = format(new Date(date), 'dd/MM/yyyy');
    const parts = day.split('/');
    const cmpMonth = parseInt(parts[1], 10);

    const dayOfWeek = date.getDay();
    return cmpMonth === this.currMonth && dayOfWeek === 0;
  }

  isSameMonth(date: Date) {
    const day = format(new Date(date), 'dd/MM/yyyy');
    const parts = day.split('/');
    const cmpMonth = parseInt(parts[1], 10);

    return cmpMonth === this.currMonth;
  }
}
