import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserReadComponent } from './pages/users/user-read/user-read.component';
import { UserCreateComponent } from './pages/users/user-create/user-create.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MyInfoComponent } from './pages/users/my-info/my-info.component';
import { RoleComponent } from './pages/role/role.component';
import { PermissionComponent } from './pages/permission/permission.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthInterceptor } from './pages/login/auth.intercepter';
import { UserEditComponent } from './pages/users/user-edit/user-edit.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ExportExcelComponent } from './pages/users/export-excel/export-excel.component';
import { ImportExcelComponent } from './pages/users/import-excel/import-excel.component';
import { ProjectViewComponent } from './pages/projects/project-view/project-view.component';
import { ProjectEditComponent } from './pages/projects/project-edit/project-edit.component';
import { ProjectCreateComponent } from './pages/projects/project-create/project-create.component';
import { TaskCreateComponent } from './pages/tasks/task-create/task-create.component';
import { TaskViewComponent } from './pages/tasks/task-view/task-view.component';
import { TimesheetViewComponent } from './pages/timesheets/timesheet-view/timesheet-view.component';
import { TimesheetCreateComponent } from './pages/timesheets/timesheet-create/timesheet-create.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { AllTimesheetComponent } from './pages/timesheets/all-timesheet/all-timesheet.component';
import { RequestViewComponent } from './pages/requests/request-view/request-view.component';
import { RequestCreateComponent } from './pages/requests/request-create/request-create.component';
import { AllRequestComponent } from './pages/requests/all-request/all-request.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { RippleModule } from 'primeng/ripple';
import { TreeModule } from 'primeng/tree';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { EditorModule } from 'primeng/editor';
import { CheckboxModule } from 'primeng/checkbox';
import { CookieService } from 'ngx-cookie-service';
import { TabViewModule } from 'primeng/tabview';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    UserReadComponent,
    UserCreateComponent,
    NotFoundComponent,
    MyInfoComponent,
    RoleComponent,
    PermissionComponent,
    LoginComponent,
    UserEditComponent,
    UploadImageComponent,
    PaginationComponent,
    ExportExcelComponent,
    ImportExcelComponent,
    ProjectViewComponent,
    ProjectEditComponent,
    ProjectCreateComponent,
    TaskCreateComponent,
    TaskViewComponent,
    TimesheetCreateComponent,
    TimesheetViewComponent,
    AllTimesheetComponent,
    RequestViewComponent,
    RequestCreateComponent,
    AllRequestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularCalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    IconFieldModule,
    InputIconModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTabsModule,
    PanelModule,
    CommonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    CalendarModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatRadioModule,
    SidebarModule,
    ButtonModule,
    PasswordModule,
    AvatarModule,
    InputTextareaModule,
    InputTextModule,
    CardModule,
    CheckboxModule,
    ToolbarModule,
    FloatLabelModule,
    AvatarGroupModule,
    EditorModule,
    RippleModule,
    DialogModule,
    TreeModule,
    ScrollPanelModule,
    FileUploadModule,
    ToastModule,
    TableModule,
    RadioButtonModule,
    PaginatorModule,
    BadgeModule,
    DynamicDialogModule,
    TagModule,
    TabViewModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideAnimationsAsync(),
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
