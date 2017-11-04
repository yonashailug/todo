import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';
import { Task, tasks } from './todo.model';

import { Todo } from './todo';

@Injectable()
export class TodoService {

  private delay = 100;

  public getData(): Observable<Task[]> {
    return of(tasks).delay(this.delay);
  }

}
