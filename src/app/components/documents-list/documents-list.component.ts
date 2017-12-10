import { Component, OnInit, TemplateRef } from '@angular/core';

//
import { FirebaseService } from './../../services/database/firebase.service';

//
import { AddFolderComponent } from './../add-folder/add-folder.component';
import { AddFileComponent } from './../add-file/add-file.component';

//
import { Folder } from './../../models/Folder';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit {
  //
  folders: Folder[];

  constructor(private dbService: FirebaseService) { }

  ngOnInit() {
    this.dbService.getFolders().subscribe(folders => {
      this.folders = folders;
    });
  }
}
