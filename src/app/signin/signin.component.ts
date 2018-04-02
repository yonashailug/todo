import { Component, OnInit } from '@angular/core';
import { AuthService } from './../shared/services/auth.service';
import { Router } from '@angular/router';

import { GlobalNotificationService } from '../shared/component/global-notification/global-notification.service';
import { MessageInfo } from '../shared/model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  messageInfo: MessageInfo;
  constructor(
    private authService: AuthService,
    private globalNotificationService: GlobalNotificationService,
    private router: Router) {
      this.globalNotificationService.messageInfoChanges.subscribe((messageInfo: MessageInfo) => {
          this.messageInfo = messageInfo;
        });
    }

  ngOnInit() {
  }

  public signin() {
    this.authService.signInWithGoogle().then((data) => {
      this.authService.initCurrentUser();
      this.router.navigate(['/todo']);
    }).catch((error) => {
      this.messageInfo = new MessageInfo();
      let message: string = '';
      switch (error.code) {
        case 'auth/network-request-failed':
        message = 'A network error has occurred.';
        break;
      }
      if (message) {
        this.messageInfo.setMessageBody(message);
        this.messageInfo.setIsError(true);
        this.setNotificationMessage(this.messageInfo);
      }
    });
  }
  public setNotificationMessage(messageInfo: MessageInfo) {
    this.globalNotificationService.setNotificationMessage(messageInfo);
  }
}
