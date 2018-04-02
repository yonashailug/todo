import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MessageInfo } from '../../model';

@Injectable()
export class GlobalNotificationService {

    public messageInfo = new BehaviorSubject<MessageInfo>(null);
    public messageInfoChanges = this.messageInfo.asObservable();

    constructor() {
    }

    public getNotificationMessage(): MessageInfo {
        return this.messageInfo.value;
    }

    public setNotificationMessage(messageInfo: MessageInfo) {
        this.messageInfo.next(messageInfo);
    }

}
