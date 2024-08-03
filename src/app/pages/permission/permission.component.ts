import { Component } from '@angular/core';
import { PermissionService } from './permission.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrl: './permission.component.scss',
})
export class PermissionComponent {
  role: any;
  permissionList: any;

  constructor(
    private route: ActivatedRoute,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.handleGetPermissionByRoleId();
  }

  handleGetPermissionByRoleId() {
    this.route.paramMap.subscribe((params) => {
      const roleId = params.get('id');

      if (roleId) {
        this.permissionService.getPermissionById(roleId).subscribe(
          (res: any) => {
            this.role = res.data.role;
            this.permissionList = res.data.permissions;
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      }
    });
  }
}
