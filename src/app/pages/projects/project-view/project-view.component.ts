import { Component } from '@angular/core';
import { ProjectViewService } from './project-view.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.scss'
})
export class ProjectViewComponent {
  projects: Array<any> = [];

  constructor(
    private router: Router,
    private projectViewService: ProjectViewService,
  ) {}

  ngOnInit() {
    this.getAllProject();
  }

  getAllProject() {
    this.projectViewService.getAllProject().subscribe((res: any) => {
      this.projects = res.data;
    });
  }

  createProject() {
    this.router.navigate(['/projects/create']);
  }

  editProject(projectId: string) {
    this.router.navigate(['/projects/edit', projectId]);
  }
}
