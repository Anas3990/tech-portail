import { Component } from '@angular/core';

//
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';

//
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

//
import { DocumentsListComponent } from './../documents-list/documents-list.component';

//
import { Folder } from './../../models/Folder';

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.css']
})
export class AddFolderComponent {
  //
  name: string;

  //
  documentsComponent: DocumentsListComponent;

  //
  private foldersCollection: AngularFirestoreCollection<Folder>;

  constructor(public bsModalRef: BsModalRef, private afs: AngularFirestore) { 
    // 
    this.foldersCollection = afs.collection('folders');
  }

  addFolder() {
    let timestamp = firebase.firestore.FieldValue.serverTimestamp();

    this.foldersCollection.add({
      name: this.name,
      timestamp: timestamp
    })
    .then(_ => {
      this.bsModalRef.hide();
    })
    .catch(error => {
      console.log(error);
    })
  }
}
