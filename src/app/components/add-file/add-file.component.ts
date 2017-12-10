import { Component, OnInit } from '@angular/core';

//
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

//
import { UploadService } from '../../services/storage/upload.service';

//
import { Upload } from '../../models/Upload';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.css']
})
export class AddFileComponent implements OnInit {
  constructor(public bsModalRef: BsModalRef, private uploadSvc: UploadService) { }

  ngOnInit() {
  }
}
