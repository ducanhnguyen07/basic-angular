import { Component, ViewChild } from '@angular/core';
import { TaskViewService } from './task-view.service';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.scss',
})
export class TaskViewComponent {
  taskList: Array<any> = [];
  statuses: Array<any> = [];

  @ViewChild('dt2') dt2!: Table;

  constructor(
    private router: Router,
    private taskViewService: TaskViewService
  ) {}

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    const mockStatus: number[] = [];
    this.taskViewService.getAllTask().subscribe((res: any) => {
      this.taskList = res.data;
      for (const task of this.taskList) {
        if (!mockStatus.includes(task.status)) {
          mockStatus.push(task.status);
        }
        // task.requirement = format(new Date(task.requirement), 'dd/MM/yyyy');
        task.requirement = new Date(task.requirement);
      }
      this.statuses = mockStatus.map(status => ({
        value: status,
        label: status === 0 ? 'Active' : 'Inactive'
      }));
    });
  }

  getSeverity(status: number) {
    switch (status) {
      case 0:
        return 'info';
      case 1:
        return 'danger'
      default:
        return 'secondary';
    }
  }


  createTask() {
    this.router.navigate(['/tasks/create']);
  }

  editTask(taskId: string) {
    this.router.navigate(['/tasks/edit', taskId]);
  }
}
