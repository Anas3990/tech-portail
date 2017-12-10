import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

//
import { FirebaseService } from './../database/firebase.service';

//
import { Event } from './../../models/Event';

@Injectable()
export class EventInfosResolverService {

  constructor(private dbService: FirebaseService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Event> {
    let id = route.paramMap.get('id');
 
    return this.dbService.getEventDetails(id).take(1).map(eventObject => {
      if (eventObject) {
        return eventObject;
      } else {
        this.router.navigate(['/events']);
        return null;
      }
    });
  }
}
