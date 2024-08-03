import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectEditService } from './project-edit.service';
import { IProject } from '../../../../common/interface/project.interface';
import { ProjectStatus } from '../../../../common/constant/project-status.const';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.scss',
  providers: [MessageService],
})
export class ProjectEditComponent {
  projectId: string | null = "";
  editProject: Partial<IProject> = {
    name: "",
    description: "",
    budget: 0,
    status: '0',
  };

  status: string = "";

  constructor(
    private route: ActivatedRoute,
    private projectEditService: ProjectEditService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    if (this.projectId) {
      this.loadProject();
    }
  }

  loadProject() {
    this.projectEditService.getProjectById(this.projectId).subscribe((project) => {
      console.log(project)
      this.editProject = project.data;
      this.status = project.data.status;
    });
  }

  onSubmit() {
    if (this.projectId) {
      for(let i=0; i<ProjectStatus.length; i++) {
        if(this.editProject.status === ProjectStatus[i]) {
          this.editProject.status = `${i}`;
          break;
        }
      }

      this.projectEditService.editProject(this.projectId, this.editProject).subscribe(
        (response) => {
          this.editProject.status = ProjectStatus[parseInt(this.editProject.status || "0")];
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Project edited",
          });
          console.log('Project updated successfully', response);
        },
        (error) => {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Failed to update project",
          });
          console.error('Failed to update project', error);
        }
      );
    }
  }
}
