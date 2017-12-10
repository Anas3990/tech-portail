import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

//
import { FirebaseService } from './../database/firebase.service';

//
import { New } from './../../models/New';

@Injectable()
export class NewInfosResolverService implements Resolve<New> {

  constructor(private dbService: FirebaseService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<New> {
    let id = route.paramMap.get('id');
 
    return this.dbService.getNewDetails(id).take(1).map(newObject => {
      if (newObject) {
        return newObject;
      } else {
        this.router.navigate(['/news']);
        return null;
      }
    });
  }
}
