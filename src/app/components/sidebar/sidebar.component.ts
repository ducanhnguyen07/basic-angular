import { Component } from '@angular/core';
import { MyInfoService } from '../../pages/users/my-info/my-info.service';
import { Router } from '@angular/router';
import { RolePermissionService } from './role-permission.service';
import { TreeNode } from 'primeng/api';

export interface CustomTreeNode extends TreeNode {
  routerLink?: string;
  children?: CustomTreeNode[];
  permission?: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  myInfo: any;
  permissionList: Array<string> = [];
  selectedFile: any = null;

  sidebarTree: CustomTreeNode[] = [
    {
      label: 'My information',
      data: 'Documents folder',
      expandedIcon: 'pi pi-user',
      collapsedIcon: 'pi pi-user',
      routerLink: 'users/my-info',
      permission: 'user_read_own_timesheet',
    },
    {
      label: 'Timesheet',
      data: 'Documents folder',
      expandedIcon: 'pi pi-calendar-minus',
      collapsedIcon: 'pi pi-calendar-plus',
      routerLink: 'my-timesheet/view',
      children: [
        {
          label: 'My timesheet',
          data: 'Work folder',
          expandedIcon: 'pi pi-clock',
          collapsedIcon: 'pi pi-clock',
          routerLink: 'my-timesheet/view',
          permission: 'user_read_own_timesheet',
        },
        {
          label: 'All timesheet',
          data: 'Work folder',
          expandedIcon: 'pi pi-calendar',
          collapsedIcon: 'pi pi-calendar',
          routerLink: 'my-timesheet/all-timesheet',
          permission: 'timesheet_read',
        },
        {
          label: 'My request',
          data: 'Work folder',
          expandedIcon: 'pi pi-calendar-times',
          collapsedIcon: 'pi pi-calendar-times',
          routerLink: 'requests/my-request',
          permission: 'own_request_read',
        },
        {
          label: 'All request',
          data: 'Work folder',
          expandedIcon: 'pi pi-receipt',
          collapsedIcon: 'pi pi-receipt',
          routerLink: 'requests/all-request',
          permission: 'request_read',
        },
      ],
    },
    {
      label: 'Role',
      data: 'Pictures folder',
      expandedIcon: 'pi pi-check-circle',
      collapsedIcon: 'pi pi-check-circle',
      routerLink: 'roles',
      permission: 'role_read',
    },
    {
      label: 'Project',
      data: 'Pictures folder',
      expandedIcon: 'pi pi-briefcase',
      collapsedIcon: 'pi pi-briefcase',
      routerLink: 'projects/view',
      permission: 'project_read',
    },
    {
      label: 'Task',
      data: 'Pictures folder',
      expandedIcon: 'pi pi-list-check',
      collapsedIcon: 'pi pi-list-check',
      routerLink: 'tasks/view',
      permission: 'task_read',
    },
    {
      label: 'User',
      data: 'Pictures folder',
      expandedIcon: 'pi pi-users',
      collapsedIcon: 'pi pi-users',
      routerLink: 'users/read',
      permission: 'user_read',
    },
    {
      label: '2FA',
      data: 'Pictures folder',
      expandedIcon: 'pi pi-verified',
      collapsedIcon: 'pi pi-verified',
      routerLink: 'two-fa',
      permission: 'user_read_own_timesheet',
    },
  ];

  constructor(
    private rolePermissionService: RolePermissionService,
    private myInfoSevice: MyInfoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.handleGetInfo();
    this.rolePermissionService.getPermissionList().subscribe((res: any) => {
      this.permissionList = res.data;
      this.filterTreeNodes();
    });
  }

  handleGetInfo() {
    this.myInfoSevice.getInfo().subscribe((res: any) => {
      this.myInfo = res.data;
    });
  }

  nodeSelect(event: any) {
    const node = event.node;
    if (node.routerLink) {
      this.router.navigate([node.routerLink]);
    }
  }

  filterTreeNodes() {
    this.sidebarTree = this.filterNodes(this.sidebarTree);
  }

  filterNodes(nodes: CustomTreeNode[]): CustomTreeNode[] {
    return nodes
      .filter(
        (node) =>
          !node.permission || this.permissionList.includes(node.permission)
      )
      .map((node) => ({
        ...node,
        children: node.children ? this.filterNodes(node.children) : [],
      }));
  }
}
