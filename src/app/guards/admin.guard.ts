import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

//
import { tap, map, take } from 'rxjs/operators';

//
import { AuthService } from './../services/authentification/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user.pipe(
      take(1),
      map(user => user && this.authService.canWrite(user) ? true : false),
      tap(canView => {
        if (!canView) {
          this.router.navigate(['dashboard'])
        }
      })
    );
  }
}
