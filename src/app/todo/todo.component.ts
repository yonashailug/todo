import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup,FormArray } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

import { TodoService } from './todo.service';
import { Todo } from './todo';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService],  
  animations: [
    trigger('fadeIn', [

      transition(':enter', [ 
        
        style({opacity:0}),
        animate('0.5s ease', style({opacity:1})) 

      ]),
      transition(':leave', [ 
        style({opacity:1}),
        animate('0.15s ease', style({opacity:0})) 

      ])
    ])

  ] 
})
export class TodoComponent implements OnInit {
  
  public completedTodos: number = 0;
  public unCompletedTodos: number = 0;
  public archivedTodos: number = 0;
  public todos: Todo[] = [];
  public hideTodos: boolean = false;
  public hideArchivedTodo: boolean = false;
  public unCompletedTasks: any = [];
  public completedTasks: any;
  public todosFormGroup: FormGroup;
  public theme: any = {
    color: 'theme--white'
  };
  @ViewChildren('textArea') public textArea: any; 

  constructor(private todoService: TodoService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getTodos();
    this.todosFormGroup = this.formBuilder.group({
      unCompletedTasks: this.formBuilder.array([]),
      completedTasks: this.formBuilder.array([])
    });
  }

  public createItem(title?, completed?, archived?, userId?, id?): FormGroup {
    return this.formBuilder.group({
      title: title || '',
      completed: completed ||  false,
      archived: archived || false,
      userId: userId || null,
      id: id || null
    });
  }

  public addTodo(): void {
    this.unCompletedTasks = this.todosFormGroup.get('unCompletedTasks') as FormArray;
    let todo = this.createItem();
    this.unCompletedTasks.push(todo);
    this.createTodo(todo.controls);
    this.getCountUnCompletedTodos();
    
    setTimeout(() => {
      this.setFocus();
    }, 50)
  }

  public getTodos():void {
    this.todoService.getTodos().subscribe((todos: Todo[]) => {
      this.unCompletedTasks = this.todosFormGroup.get('unCompletedTasks') as FormArray;
      this.completedTasks = this.todosFormGroup.get('completedTasks') as FormArray;
      todos.forEach((todo: Todo) => {
        if(!this.unCompletedTasks) {
          this.unCompletedTasks = [];
        }
        if(!this.completedTasks){
          this.completedTasks = [];
        }
        if(todo.getCompleted()) {
          this.completedTasks.push(this.createItem(todo.getTitle(), todo.getCompleted(), todo.getArchived(), todo.getUserId(), todo.getId()));
        } else {
          this.unCompletedTasks.push(this.createItem(todo.getTitle(), todo.getCompleted(), todo.getArchived(), todo.getUserId(), todo.getId()));
        }
      })
      this.getCountCompletedTodos();
      this.getCountUnCompletedTodos();
      // this.getArchivedTodos();

    }, error => {
      console.log("error occured!");
    });

  }

  public markCompleted(todo, event):void {

      let updateTodoRef: Todo = new Todo();
      updateTodoRef.setArchived(todo.archived.value);
      updateTodoRef.setUserId(todo.userId.value);
      updateTodoRef.setId(todo.id.value);
      updateTodoRef.setTitle(todo.title.value);

      if(event.checked) {
        updateTodoRef.setCompleted(true);
        this.updateCompletedTodo(updateTodoRef); 
      } else {
        updateTodoRef.setCompleted(false);
        updateTodoRef.setArchived(false);
        this.undoCompletedTodo(updateTodoRef);
      }
      this.getCountCompletedTodos();
      this.getCountUnCompletedTodos();
  }

  public removeFromItems(id):void {
    let array = this.unCompletedTasks.controls.filter(i => {
      return i.controls.id.value !== id
    });  
    this.unCompletedTasks.controls = array;
    this.getCountUnCompletedTodos();
    this.getCountCompletedTodos();
  }

  public removeFromCompletedTasks(id):void {
    let array = this.completedTasks.controls.filter(i => {
      return i.controls.id.value !== id
    });  
    this.completedTasks.controls = array;
    this.getCountCompletedTodos();
    this.getCountUnCompletedTodos();
  }

  public changeTodo(todo) {
    if(!todo.id.value) {
      this.createTodo(todo);
      return;
    }
    let updateTodoRef: Todo = new Todo();
    updateTodoRef.setArchived(todo.archived.value);
    updateTodoRef.setUserId(1);
    updateTodoRef.setId(todo.id.value);
    updateTodoRef.setTitle(todo.title.value);
    updateTodoRef.setCompleted(todo.completed.value);
    this.updateTodo(updateTodoRef);
  }

  public updateTodo(todo):void {
    this.todoService.updateTodo(todo).subscribe(success => {
    }, error => {
      console.log(error);
    })
  }

  public updateCompletedTodo(todo):void {
    this.todoService.updateTodo(todo).subscribe(success => {
      this.completedTasks.push(this.createItem(todo.getTitle(), todo.getCompleted(), todo.getArchived(), todo.getUserId(), todo.getId()));
      this.removeFromItems(todo.getId());
      this.getCountCompletedTodos();
      this.getCountUnCompletedTodos();
    }, error => {
      console.log(error);
    })
  }

  public undoCompletedTodo(todo):void {
    this.todoService.updateTodo(todo).subscribe(success => {
      this.unCompletedTasks.push(this.createItem(todo.getTitle(), todo.getCompleted(), todo.getArchived(), todo.getUserId(), todo.getId()));
      this.removeFromCompletedTasks(todo.getId());
    }, error => {
      console.log(error);
    })
  }

  public deleteTodo(todo) {
    if(!todo.id.value) {
      //TODO: please refactor me
      let array = this.unCompletedTasks.controls.filter(i => {
        return i.controls.id.value !== todo.id.value
      });  
      this.unCompletedTasks.controls = array;
      this.getCountCompletedTodos();
      this.getCountUnCompletedTodos();
      return;
    }
    this.todoService.deleteTodo(todo.id.value).subscribe(success => {
      this.removeFromItems(todo.id.value);
      this.getCountCompletedTodos();
      this.getCountUnCompletedTodos();
    }, error => {
      console.log(error);
    })  
  }

  public deleteCompletedTodo(todo):void {
    this.todoService.deleteTodo(todo.id.value).subscribe(success => {
      this.removeFromCompletedTasks(todo.id.value);
      this.getCountCompletedTodos();
      this.getCountUnCompletedTodos();
    }, error => {
      console.log(error);
    })  
  }


  public archiveTodo(todo: Todo):void {
    if(todo.getArchived()) {
      todo.setArchived(false);
    } else {
      todo.setArchived(true);
    }
    this.updateTodo(todo);
  }

  public createTodo(todo):void {
    let newTodo: Todo = new Todo();
    newTodo.setTitle(todo.title.value);
    newTodo.setCompleted(false);
    newTodo.setArchived(false);
    newTodo.setUserId(1);
    this.todoService.createTodo(newTodo).subscribe((newTodo: Todo) => {
      todo.id.setValue(newTodo.getId());
      todo.userId.setValue(newTodo.getUserId());
    }, error => {
      console.log("error occured!");
    })
  }

  public getCountCompletedTodos():void {
    this.completedTasks.controls ? this.completedTodos = this.completedTasks.controls.length : this.completedTodos = 0;
  }
  public getCountUnCompletedTodos():void {
    this.unCompletedTasks.controls ? this.unCompletedTodos = this.unCompletedTasks.controls.length : this.unCompletedTodos = 0;
  }

  public getArchivedTodos():void {
    this.archivedTodos = 0;
    this.todos.forEach((todo: Todo) => {
      if(todo.getArchived()) {
        this.archivedTodos++;
      }
    })
  }

  public hideCompletedTodos():void {
    this.hideTodos? this.hideTodos = false : this.hideTodos = true;
  }

  public hideArchivedTodos():void {
    this.hideArchivedTodo? this.hideArchivedTodo = false : this.hideArchivedTodo = true;
  }

  public allowDrop(event) {
    event.preventDefault();
  }

  public drag(event):void {
    // event.dataTransfter.setData("text", event.target.id);
    console.log(event);
  }

  public drop(event):void {
    event.preventDefault();
    console.log(event);
  }

  public markAllAsCompleted():void {
    if(!this.unCompletedTasks) return;
    this.unCompletedTasks.controls.forEach(todo => {
      let updateTodoRef: Todo = new Todo();
      updateTodoRef.setArchived(todo.controls.archived.value);
      updateTodoRef.setUserId(todo.controls.userId.value);
      updateTodoRef.setId(todo.controls.id.value);
      updateTodoRef.setTitle(todo.controls.title.value);
      updateTodoRef.setCompleted(true);
      this.updateCompletedTodo(updateTodoRef);
    });
  
  }

  public markAllAsInCompleted():void {
    if(!this.completedTasks) return;
    this.completedTasks.controls.forEach(todo => {
      let updateTodoRef: Todo = new Todo();
      updateTodoRef.setArchived(false);
      updateTodoRef.setUserId(todo.controls.userId.value);
      updateTodoRef.setId(todo.controls.id.value);
      updateTodoRef.setTitle(todo.controls.title.value);
      updateTodoRef.setCompleted(false);
      this.undoCompletedTodo(updateTodoRef);
    });
  }

  public deleteCompletedItems():void {
    if(!this.completedTasks) return;
    this.completedTasks.controls.forEach(todo => {
      this.deleteCheckedItems(todo.controls);
    });   
  }

  public changeTheme(color: string):void {
    this.theme.color = color;
  }

  public deleteCheckedItems(todo):void {
    this.todoService.deleteTodo(todo.id.value).subscribe(success => {
      this.removeFromCompletedTasks(todo.id.value);
      this.getCountCompletedTodos();
    }, error => {
      console.log(error);
    })  
  }

  public setFocus() {
    this.textArea.last.nativeElement.focus();
  }

}
