import { Component, OnInit } from '@angular/core';

//
import { CloudMessagingService } from './services/FCM/cloud-messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app'

  message;

  constructor(private fcmService: CloudMessagingService) { }

  ngOnInit() {
    this.fcmService.receiveMessage()
    this.message = this.fcmService.currentMessage;
  }
}
