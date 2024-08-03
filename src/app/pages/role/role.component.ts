import { Component } from '@angular/core';
import { RoleService } from './role.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IRoleUpdate } from '../../../common/interface/role-update.interface';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss',
  providers: [MessageService],
})
export class RoleComponent {
  userList: Array<any> = [];
  roleList: Array<any> = [];
  updateList: Array<IRoleUpdate> = [];

  constructor(
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.updateList = [];
    this.handleGetRole();
    this.handleGetRoleUser();
  }

  handleGetRole() {
    this.roleService.getRole().subscribe((res: any) => {
      this.roleList = res.data;
    });
  }

  handleGetRoleUser() {
    this.roleService.getRoleUser().subscribe((res: any) => {
      this.userList = res.data;
    });
  }

  onRoleChange(userId: string, newRoleId: string) {
    const userIndex = this.updateList.findIndex(u => u['userId'] === userId);
    
    if(userIndex !== -1) {
      this.updateList[userIndex]['role'] = newRoleId;
    } else {
      this.updateList.push({
        userId: userId,
        role: newRoleId,
      });
    }
  }

  handleUpdateUser() {
    this.roleService.postRoleUser(this.updateList).subscribe(
      (response) => {
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Update role successful!",
        });
        console.log(response);
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Update role fail!",
        });
        console.error(error);
      },
    );
  }
}
