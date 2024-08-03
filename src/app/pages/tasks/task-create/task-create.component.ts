import { Component } from '@angular/core';
import { TaskCreateService } from './task-create.service';
import { ProjectViewService } from '../../projects/project-view/project-view.service';
import { UserViewService } from '../../users/user-read/user-view.service';
import { FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.scss',
  providers: [MessageService],
})
export class TaskCreateComponent {
  newTask: any = {};
  projectList: Array<any> = [];
  userList: Array<any> = [];
  projectControl = new FormControl<any | null>(null, Validators.required);
  userControl = new FormControl<any | null>(null, Validators.required);

  constructor(
    private taskCreateService: TaskCreateService,
    private projectViewService: ProjectViewService,
    private userViewSerVise: UserViewService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.newTask.status = '0';
    this.newTask.projectId = '';
    this.newTask.userId = '';

    const projectSubscription = this.projectViewService.getAllProject().subscribe((data: any) => this.projectList = data.data);

    const userSubcription = this.userViewSerVise.getUserList().subscribe((data: any) => this.userList = data.data);
  }


  onSubmit() {
    this.taskCreateService.postCreateTask(this.newTask).subscribe(
      (response) => {
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Create task successful!",
        });
        console.log(response);
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Create task fail!",
        });
        console.error(error);
      },
    );
  }
}
