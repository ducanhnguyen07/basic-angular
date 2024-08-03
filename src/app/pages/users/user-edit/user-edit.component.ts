import { Component } from '@angular/core';
import { ICreateUser } from '../../../../common/interface/create-user.interface';
import { roleList } from '../../../../common/constant/role-list';
import { branchList } from '../../../../common/constant/branch-list';
import { ActivatedRoute } from '@angular/router';
import { UserEditService } from './user-edit.service';
import { FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
  providers: [MessageService],
})
export class UserEditComponent {
  userId: string | null = "";
  branchList: any[] = branchList;
  roleList: string[] = roleList;

  editUser: Partial<ICreateUser> = {
    name: "",
    email: "",
    password: "",
    address: "",
    gender: "",
    branch: 0,
    role: 0,
  }

  branchName: string = "";
  branchControl = new FormControl<any | null>(null, Validators.required);

  constructor(
    private route: ActivatedRoute,
    private userEditService: UserEditService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.loadUser();
    }
  }

  loadUser() {
    this.userEditService.getUserById(this.userId).subscribe((user) => {
      this.editUser = user.data;
      this.branchName = user.data.branch;
    });
  }

  onSubmit() {
    if (this.userId) {
      for(let i = 0; i < branchList.length; i++) {
        if (branchList[i]['name'] === this.branchName) {
          this.editUser.branch = i;
          break;
        }
      }
      this.userEditService.editUser(this.userId, this.editUser).subscribe(
        (response) => {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "User updated successfully",
          });
          console.log('User updated successfully', response);
        },
        (error) => {
          this.messageService.add({
            severity: "danger",
            summary: "Danger",
            detail: "Failed to update user",
          });
          console.error('Failed to update user', error);
        }
      );
    }
  }
}
