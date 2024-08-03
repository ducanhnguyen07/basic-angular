import { Component, EventEmitter, Output } from '@angular/core';
import { UserReadService } from './user-read.service';
import { Router } from '@angular/router';
import { UserViewService } from './user-view.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-read',
  templateUrl: './user-read.component.html',
  styleUrl: './user-read.component.scss',
  providers: [MessageService],
})
export class UserReadComponent {
  users: Array<any> = [];
  totalUsers: number = 0;
  currentPage: number = 1;
  limit: number = 10;

  urlForFetch: string = '';

  pagination = {
    totalPage: 0,
    currentPage: 1,
  };

  constructor(
    private router: Router,
    private userReadService: UserReadService,
    private userViewService: UserViewService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.handleGetAllUsers();
  }

  // handleGetAllUsers() {
  //   this.userReadService.getAllUsers().subscribe((res: any) => {
  //     this.users = res.data.responseListUser;
  //   });
  // }

  handleGetAllUsers() {
    this.userViewService.getUserList().subscribe((res: any) => {
      this.users = res.data;
    });
  }

  handleUrlChange(url: string): void {
    this.urlForFetch = url;
    console.log('URL for fetch:', this.urlForFetch);
    // Gọi phương thức getUsers hoặc bất kỳ phương thức nào khác để lấy dữ liệu từ URL này.
    this.fetchDataFromUrl();
  }

  fetchDataFromUrl(): void {
    // Gọi API sử dụng URL đã nhận được
    this.userReadService.getDataFromUrl(this.urlForFetch).subscribe(
      (data: any) => {
        this.users = data.data.responseListUser;
        this.pagination.totalPage = Math.ceil(this.totalUsers / this.limit);
        this.pagination.currentPage = data.page;
      },
      (error: any) => {
        console.error('Error fetching data from URL', error);
      }
    );
  }

  editUser(userId: string) {
    this.router.navigate(['/users/edit', userId]);
  }

  createUser() {
    this.router.navigate(['/users/create']);
  }
  onUploadComplete() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Excel file imported successfully!',
    });
  }
}