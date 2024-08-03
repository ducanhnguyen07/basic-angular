import { Component } from '@angular/core';
import { TimesheetCreateService } from './timesheet-create.service';
import { FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-timesheet-create',
  templateUrl: './timesheet-create.component.html',
  styleUrl: './timesheet-create.component.scss',
  providers: [MessageService],
})
export class TimesheetCreateComponent {
  newTimesheet: any = {
    taskId: '',
    note: '',
    workingTime: 0,
  };
  isSuccess: boolean = true;

  taskList: Array<any> = [];
  taskControl = new FormControl<any | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);

  callback: Function | undefined;

  constructor(
    private timesheetCreateService: TimesheetCreateService,
    public ref: DynamicDialogRef,
    private messageService: MessageService,
    private config: DynamicDialogConfig
  ) {
    this.callback = this.config.data?.callback;
  }

  ngOnInit() {
    this.timesheetCreateService.getAllTask().subscribe((res: any) => {
      this.taskList = res.data;
    });
  }

  async onSubmit() {
    try {
      const response = await firstValueFrom(
        this.timesheetCreateService.postCreateTimesheet(this.newTimesheet)
      );
      this.isSuccess = true;
      console.log('Response received', response);
      if (this.callback) {
        this.callback(this.isSuccess);
      }
    } catch (error) {
      this.isSuccess = false;
      if (this.callback) {
        this.callback(this.isSuccess);
      }
      console.error('Error occurred', error);
    } finally {
      this.ref.close();
    }
  }
}
