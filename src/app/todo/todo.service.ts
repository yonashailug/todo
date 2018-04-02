import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Todo, todos } from './todo.model';
import { Media } from '../shared/model';
import { Config } from '../shared/config';
import { EventEmitterService } from '../shared/services/event-emitter.service';
import { SnackBarService } from './../shared/services/snackbar.service';
import { AuthService } from './../shared/services/auth.service';

@Injectable()
export class TodoService {

  private delay = 100;
  private mediaPath: string = '';
  private dbPath: string = Config.DB_PATH;
  private mediaUploads: AngularFireList<Media>;
  private userUID: string = '';

  constructor(private db: AngularFireDatabase,
    private authService: AuthService,
    private snackBarService: SnackBarService,
    private eventEmitterService: EventEmitterService) {
  }

  private getModelPath() {
    return this.db.list(this.dbPath);
  }

  public getLocalData(): Observable<Todo[]> {
    return of(todos).delay(this.delay);
  }

  public getTodos(): Observable<Todo[]> {
    const todos = this.db.list(this.dbPath, ref => ref.orderByChild('uid').equalTo(this.authService.getCurrentUser().uid));
    return todos.snapshotChanges().map(changes => {
      return changes.map(change => ({
        key: change.payload.key, ...change.payload.val()
      }));
    });
  }

  public updateTodo(key, todo): void {
    this.getModelPath().update(key, todo).catch(error => {
      console.log('error updating: ', error);
    });
  }

  public createTodo(todo): void {
    this.getModelPath().push(todo); // TODO: handle error
  }

  public removeTodo(key): void {
    this.getModelPath().remove(key).catch(error => {
      console.log('error deleting..', error);
    });
  }

  public uploadMedia(key: string, media: Media) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${key}`).put(media.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot: any) => {
      media.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.eventEmitterService.setUploadProgress(media.progress);
    }, (error: any) => {
      this.eventEmitterService.setUploadProgress(0);
      let message: string = '';
      switch (error.code) {
        case 'storage/unauthorized':
        message = `User doesn't have permission`;
        break;
        case 'storage/canceled':
        message = 'User canceled the upload';
        break;
        case 'storage/unknown':
        message = 'Unknown error occured';
        break;
      }
      this.snackBarService.openSnackBar(message);
    }, () => {
        this.eventEmitterService.setUploadProgress(0);
        this.saveMedia(key);
      });
  }

  public saveMedia(key: string) {
    this.db.list(this.dbPath).update(key, {
      mediaUrl: key
    });
  }

  public deleteMedia(key: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${key}`).delete();
  }
}
