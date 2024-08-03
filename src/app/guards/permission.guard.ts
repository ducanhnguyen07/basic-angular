import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RolePermissionService } from '../components/sidebar/role-permission.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(
    private rolePermissionService: RolePermissionService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const expectedPermission = route.data['permission'];

    return this.rolePermissionService.getPermissionList().pipe(
      map((res: any) => {
        const permissionList: string[] = res.data;
        if (permissionList.includes(expectedPermission)) {
          return true;
        } else {
          return this.router.navigate(['not-found']);
        }
      })
    );
  }
}