import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../pages/login/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsAuthenticatedGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isLoggedIn.pipe(
      tap((isLoggedIn) => {
        const isValid2FA = localStorage.getItem('is2FAValidated');
        if (isLoggedIn && isValid2FA != null) {
          return true;
        } else {
          localStorage.removeItem('accessToken');
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
