import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './pages/users/user-create/user-create.component';
import { UserReadComponent } from './pages/users/user-read/user-read.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MyInfoComponent } from './pages/users/my-info/my-info.component';
import { RoleComponent } from './pages/role/role.component';
import { PermissionComponent } from './pages/permission/permission.component';
import { LoginComponent } from './pages/login/login.component';
import { UserEditComponent } from './pages/users/user-edit/user-edit.component';
import { ProjectViewComponent } from './pages/projects/project-view/project-view.component';
import { ProjectCreateComponent } from './pages/projects/project-create/project-create.component';
import { ProjectEditComponent } from './pages/projects/project-edit/project-edit.component';
import { TaskViewComponent } from './pages/tasks/task-view/task-view.component';
import { TaskCreateComponent } from './pages/tasks/task-create/task-create.component';
import { TimesheetViewComponent } from './pages/timesheets/timesheet-view/timesheet-view.component';
import { AllTimesheetComponent } from './pages/timesheets/all-timesheet/all-timesheet.component';
import { RequestViewComponent } from './pages/requests/request-view/request-view.component';
import { AllRequestComponent } from './pages/requests/all-request/all-request.component';
import { IsAuthenticatedGuard } from './guards/authentication.guard';
import { PermissionGuard } from './guards/permission.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '',
    canActivate: [IsAuthenticatedGuard],
    children: [
      {
        path: '',
        redirectTo: 'users/my-info',
        pathMatch: 'full',
      },

      {
        path: 'users/create',
        component: UserCreateComponent,
        canActivate: [PermissionGuard],
        data: { permission: 'user_create' },
      },
      {
        path: 'users/read',
        component: UserReadComponent,
        canActivate: [PermissionGuard],
        data: { permission: 'user_read' },
      },
      {
        path: 'users/my-info',
        component: MyInfoComponent,
        canActivate: [PermissionGuard],
        data: { permission: 'user_read_own_timesheet' },
      },
      {
        path: 'users/edit/:id',
        component: UserEditComponent,
        canActivate: [PermissionGuard],
        data: { permission: 'user_update' },
      },

      {
        path: 'projects/view',
        component: ProjectViewComponent,
        canActivate: [PermissionGuard],
        data: { permission: 'project_read' },
      },
      {
        path: 'projects/create',
        component: ProjectCreateComponent,
        data: { permission: 'project_create' },
      },
      {
        path: 'projects/edit/:id',
        component: ProjectEditComponent,
        canActivate: [PermissionGuard],
        data: { permission: 'project_update' },
      },

      {
        path: 'tasks/view',
        component: TaskViewComponent,
        canActivate: [PermissionGuard],
        data: { permission: 'task_read' },
      },
      {
        path: 'tasks/create',
        component: TaskCreateComponent,
        canActivate: [PermissionGuard],
        data: { permission: 'task_create' },
      },

      {
        path: 'my-timesheet/view',
        component: TimesheetViewComponent,
        canActivate: [PermissionGuard],
        data: { permission: 'user_read_own_timesheet' },
      },
      {
        path: 'my-timesheet/all-timesheet',
        component: AllTimesheetComponent,
        canActivate: [PermissionGuard],
        data: { permission: 'timesheet_read' },
      },

      {
        path: 'requests/my-request',
        component: RequestViewComponent,
        canActivate: [PermissionGuard],
        data: { permission: 'own_request_read' },
      },
      {
        path: 'requests/all-request',
        component: AllRequestComponent,
        canActivate: [PermissionGuard],
        data: { permission: 'request_read' },
      },

      {
        path: 'roles',
        component: RoleComponent,
        canActivate: [PermissionGuard],
        data: { permission: 'role_read' },
      },
      {
        path: 'roles/:id',
        component: PermissionComponent,
        canActivate: [PermissionGuard],
        data: { permission: 'role_read' },
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
