import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { MessageInfo } from '../../model';
import { GlobalNotificationService } from './global-notification.service';

@Component({
  selector: 'app-global-notification',
  templateUrl: './global-notification.component.html',
  styleUrls: ['./global-notification.component.scss'],
  animations: [
    trigger('fadeInOut', [

      transition(':enter', [ 
        
        style({opacity:0,background: 'red' }),
        animate(200, style({opacity:1, background: 'green'})) 

      ]),
      transition(':leave', [ 
        
        animate(0, style({opacity:0,background: 'red'})) 

      ])
    ])

  ]   
})
export class GlobalNotificationComponent implements OnInit {

  @Input() public messageInfo: MessageInfo = new MessageInfo();
  public showMessage: boolean = false;

  constructor(private globalNotificationService: GlobalNotificationService) {}

  ngOnInit() {

    this.globalNotificationService.messageInfoChanges.subscribe((messageInfo: MessageInfo) => {
      this.messageInfo = messageInfo;
      this.showMessage = false;
    });

  }

  public dismissMessage() {
    this.showMessage ? this.showMessage = false : this.showMessage = true;
  }

}
