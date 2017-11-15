import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Todo, todos } from './todo.model';
import { Media } from '../model/media.model';
import { Config } from '../config';

@Injectable()
export class TodoService {

  private delay = 100;
  private mediaPath: string = '';
  private dbPath: string = Config.DB_PATH;
  private mediaUploads: AngularFireList<Media>;

  constructor(private db: AngularFireDatabase) {}

  private todosRef = this.db.list(this.dbPath);

  public getLocalData(): Observable<Todo[]> {
    return of(todos).delay(this.delay);
  }

  public getTodos(): Observable<Todo[]> {

    return this.todosRef.snapshotChanges().map(changes => {
      
      return changes.map(change => ({
        key: change.payload.key,...change.payload.val() 
      }));

    });

  }

  public updateTodo(key, todo): void {
    this.todosRef.update(key, todo);
  }

  public createTodo(todo): void {
    this.todosRef.push(todo);
  }

  public removeTodo(key): void {
    this.todosRef.remove(key);
  }

  public uploadMedia(key: string, media: Media) {

    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${key}`).put(media.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,(snapshot: any) => {
      media.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + media.progress + '% done');
    }, 
    (error) => { console.log(error); }, 
    () => {
        media.url = uploadTask.snapshot.downloadURL;
        media.name = media.file.name;
        this.saveMedia(key, media);
      });

  }

  public saveMedia(key: string, media: Media) {
    this.db.list('todos').update(key, {
      mediaUrl: key
    });
  }
}
