import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';

import { Todo, todos } from './todo.model';

@Injectable()
export class TodoService {

  private delay = 100;
  public getData(): Observable<Todo[]> {
    return of(todos).delay(this.delay);
  }
  // TODO: use localstorage or firebase
}
