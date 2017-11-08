import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatListModule, MatCardModule, MatMenuModule, MatButtonModule, MatCheckboxModule} from '@angular/material';
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

const routes: Routes = [
  {
    path: '',
    redirectTo: 'todo',
    pathMatch: 'full'
  }, {
    path: 'home',
    component: AppComponent
  }, {
    path: 'todo',
    component: TodoComponent
  }, {
    path: '**',
    component: TodoComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent
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
    RouterModule.forRoot(routes),
    DragulaModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  exports: [],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
