import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaUrlPipe } from './pipes/media.url.pipe';
import { FirebaseStorageService } from './services/firebase.storage.service';
import { AuthService } from './services/auth.service';
import { GuardService } from './services/guard.service';
import { EventEmitterService } from './services/event-emitter.service';
import { SnackBarService } from './services/snackbar.service';
import { GlobalNotificationComponent } from './component/global-notification/global-notification.component';
import { GlobalNotificationService } from './component/global-notification/global-notification.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MediaUrlPipe,
    GlobalNotificationComponent
  ],
  providers: [
    FirebaseStorageService,
    AuthService,
    GuardService,
    EventEmitterService,
    SnackBarService,
    GlobalNotificationService
  ],
  exports: [
    MediaUrlPipe,
    GlobalNotificationComponent
  ]
})
export class SharedModule { }
