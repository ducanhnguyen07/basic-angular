import { Component, SimpleChanges } from '@angular/core';
import { TimesheetCreateService } from './timesheet-create.service';
import { FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { AllTimesheetService } from '../all-timesheet/all-timesheet.service';
import { TimesheetStatus } from '../../../../common/constant/timesheet-status.const';

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
    logTime: new Date(),
  };

  isSuccess: boolean = true;

  taskList: Array<any> = [];
  taskControl = new FormControl<any | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);

  isEdit: boolean = false;
  timesheetId: string = "";
  editTask: string = "";
  editTaskId: string = "";
  editTimesheetObject: any = {};

  callback: Function | undefined;

  constructor(
    private timesheetCreateService: TimesheetCreateService,
    public ref: DynamicDialogRef,
    private messageService: MessageService,
    private config: DynamicDialogConfig,
    private allTimesheetService: AllTimesheetService,
  ) {
    this.callback = this.config.data?.callback;
    this.isEdit = this.config.data?.isEdit;
    this.newTimesheet.logTime = this.config.data?.date;
  }

  ngOnInit() {
    this.timesheetCreateService.getAllTask().subscribe((res: any) => {
      this.taskList = res.data;
    });
    if(this.isEdit) {
      this.editTimesheet(this.config.data?.timesheetId);
    }
  }

  async onSubmit() {
    if(!this.isEdit) {
      this.newTimesheet.taskId = this.editTaskId;
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
    } else {
      try {
        for (const status of TimesheetStatus) {
          if(this.editTimesheetObject.status == status.title) {
            this.editTimesheetObject.status = status.id;
          }
        }

        const response = await firstValueFrom(
          this.allTimesheetService.updateTimesheet(this.editTimesheetObject, this.timesheetId)
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

  editTimesheet(timesheetId: string) {
    this.timesheetId = timesheetId;
    this.timesheetCreateService.getTimesheet(timesheetId).subscribe(
      (res: any) => {
        this.editTimesheetObject = res.data.timesheet;
        this.editTask = res.data.taskName;
        this.editTaskId = res.data.taskId;
      }
    );
  }
}
