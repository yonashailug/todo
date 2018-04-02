import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, 
  MatSnackBarModule, 
  MatListModule, 
  MatCardModule, 
  MatMenuModule, 
  MatButtonModule, 
  MatCheckboxModule,
  MatGridListModule} from '@angular/material';
import { Routes, RouterModule } from '@angular/router';
import { DragulaModule } from 'ng2-dragula';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { TodoService } from './todo/todo.service';
import { environment } from '../environments/environment';
import { SigninComponent } from './signin/signin.component';
import { SharedModule } from './shared/shared.module';
import { GuardService } from './shared/services/guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  }, {
    path: 'todo',
    component: TodoComponent,
    canActivate: [GuardService]
  }, {
    path: 'todo/:id',
    component: TodoComponent,
    canActivate: [GuardService]
  }, {
    path: 'signin',
    component: SigninComponent
  }, {
    path: '**',
    component: TodoComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatSnackBarModule,
    MatGridListModule,
    RouterModule.forRoot(routes),
    DragulaModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    SharedModule
  ],
  exports: [],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
