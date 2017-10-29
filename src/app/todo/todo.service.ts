import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";

import { Todo } from './todo';
import { environment } from './../../environments/environment';

@Injectable()
export class TodoService {

  private BASEURL: string = environment.BASEURL;
  public TODOS_API: string = "todos";

  constructor(private http: Http) { }

  public getResoucePath(): string {
    return this.BASEURL;
  }

  public getTodos(): Observable<Todo[]> {
    
    return this.http.get(`${this.getResoucePath()}/${this.TODOS_API}`).map((response: Response) => {

      let todos: Todo[] = [];
      response.json().forEach(todo => {
          todos.push(Todo.fromObject(todo));
      });

      return todos;

    })
  }

  public updateTodo(todo: Todo): Observable<any> {

    let options: RequestOptions = new RequestOptions();
    options.headers = new Headers({'Content-Type': 'application/json'});
    
    return this.http.put(`${this.getResoucePath()}/${this.TODOS_API}/${todo.getId()}`, JSON.stringify(todo), options).map((response: Response) => {
      return "success";
    })
    
  }

  public createTodo(todo: Todo): Observable<any> {

    let options: RequestOptions = new RequestOptions();
    options.headers = new Headers({'Content-Type': 'application/json'});
    
    return this.http.post(`${this.getResoucePath()}/${this.TODOS_API}`, JSON.stringify(todo), options).map((response: Response) => {
      return Todo.fromObject(response.json());
    })

  }

  public deleteTodo(id:number): Observable<any> {

    return this.http.delete(`${this.getResoucePath()}/${this.TODOS_API}/${id}`).map((response: Response) => {
      return "success";
    })

  }

  public updateAll(todos: Todo[]) {

    let options: RequestOptions = new RequestOptions();
    options.headers = new Headers({'Content-Type': 'application/json'});

    return this.http.patch(`${this.getResoucePath()}/${this.TODOS_API}`, JSON.stringify(todos), options).map((response: Response) => {
      return "success";
    })

  }

}
