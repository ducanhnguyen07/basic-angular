import { Component } from '@angular/core';
import { UserCreateService } from './user.create.service';
import { branchList } from '../../../../common/constant/branch-list';
import { roleList } from '../../../../common/constant/role-list';
import { FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
  providers: [MessageService],
})
export class UserCreateComponent {
  branchList: string[] = branchList;
  roleList: string[] = roleList;

  newUser: any = {
    name: "",
    email: "",
    password: "",
    address: "",
    gender: "male",
    branch: 0,
    role: 0,
  };

  branchControl = new FormControl<any | null>(null, Validators.required);
  roleControl = new FormControl<any | null>(null, Validators.required);
  
  constructor(
    private userCreateService: UserCreateService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
  }

  onSubmit() {
    if (this.newUser.branch == null || this.newUser.role == null) {
      return;
    }
    
    this.userCreateService.createUser(this.newUser).subscribe(
      (response) => {
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Create user successful!",
        });
        console.log('User created successfully', response);
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Create user fail!",
        });
        console.error('Error creating user', error);
      }
    );
  }
}
