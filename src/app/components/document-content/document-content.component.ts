import { Component, OnInit } from '@angular/core';

//
import { Router, ActivatedRoute, Params } from '@angular/router';

//
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';

//
import { Folder } from './../../models/Folder';

@Component({
  selector: 'app-document-content',
  templateUrl: './document-content.component.html',
  styleUrls: ['./document-content.component.css']
})
export class DocumentContentComponent implements OnInit {

  //
  folderName: string;

  constructor(private router: Router, private route: ActivatedRoute, private afs: AngularFirestore) { }

  ngOnInit() {
    this.route.data.subscribe((data: { folderObject: Folder }) => {
      this.folderName = data.folderObject.name;
    });
  }
}
