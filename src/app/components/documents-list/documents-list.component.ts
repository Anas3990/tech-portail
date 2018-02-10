import { Component, OnInit, TemplateRef } from '@angular/core';

//
import { FirebaseService } from './../../services/database/firebase.service';

//
import { AddFolderComponent } from './../add-folder/add-folder.component';
import { AddFileComponent } from './../add-file/add-file.component';

//
import { AuthService } from './../../services/authentification/auth.service';

//
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

//
import { Folder } from './../../models/Folder';
import { User } from '../../models/User';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit {
  //
  bsModalRef: BsModalRef;

  //
  folders: Folder[];

  //
  user: User;

  constructor(private dbService: FirebaseService, private modalService: BsModalService, public authService: AuthService) { }

  ngOnInit() {
    this.dbService.getFolders().subscribe(folders => {
      this.folders = folders;
    });

    //
    this.authService.user.subscribe(user => {
      this.user = user;
    })
  }
}
