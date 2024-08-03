import { Component } from '@angular/core';
import { IProject } from '../../../../common/interface/project.interface';
import { ProjectCreateService } from './project-create.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.scss',
  providers: [MessageService],
})
export class ProjectCreateComponent {
  newProject: IProject = {
    name: "",
    description: "",
    budget: 0,
    status: '0',
  };

  constructor(
    private projectCreateService: ProjectCreateService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {

  }

  onSubmit() {
    this.projectCreateService.createNewProject(this.newProject).subscribe(
      (response) => {
        // alert('Project created successfully');
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Create project success!',
        });
        console.log('Project created successfully', response);
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Fail',
          detail: 'Create project failed!',
        });
        console.error('Error creating project', error);
      }
    );
  }
}
