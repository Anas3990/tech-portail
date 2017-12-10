import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

//
import { FirebaseService } from './../database/firebase.service';

//
import { Folder } from './../../models/Folder';

@Injectable()
export class DocumentContentResolverService {

  constructor(private dbService: FirebaseService, private router: Router) { }
  
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Folder> {
      let id = route.paramMap.get('id');
   
      return this.dbService.getFolderContent(id).take(1).map(folderObject => {
        if (folderObject) {
          return folderObject;
        } else {
          this.router.navigate(['/documents']);
          return null;
        }
      });
    }

}
