import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import { TodoService } from './todo.service';
import { Todo, Task } from './todo.model';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss'],
    animations: [
        trigger('fadeIn', [
          transition(':enter', [
            style({opacity: 0}),
            animate('0.5s ease', style({opacity: 1}))
          ]),
          transition(':leave', [
            style({opacity: 1}),
            animate('0.15s ease', style({opacity: 0}))
          ])
        ])
      ]
})
export class TodoComponent implements OnInit {

    todos: Observable<Todo[]>;
    todoArray: Todo[] = [];
    todosFormGroup: FormGroup;
    selectedTask: Task;
    hideTasks: string = '';
    nameChangeLog: string[] = [];
    @ViewChildren('textArea') public textArea: QueryList<ElementRef>;

    constructor(private todoService: TodoService, private fb: FormBuilder) {}

    ngOnInit() {
        this.getTodos();
        this.createForm();
        // this.logChange();
    }

    createForm(): void {
        this.todosFormGroup = this.fb.group({
            todos: this.fb.array([]),
        });
    }

    getTodos(): void {
        this.todos = this.todoService.getData()
                        .finally(() => { console.log('data fetched!'); });
        this.todos.subscribe((todos: Todo[]) => {
            this.todoArray = todos;
            this.setTodos(this.todoArray);
        });
    }

    setTodos(todos: Todo[]): void {
        const todoFGs = todos.map(todo => this.fb.group({
            id: todo.id,
            color: todo.color,
            name: todo.name,
            hideCheckedItems: todo.hideCheckedItems,
            tasks: this.setTodoTasks(todo.tasks),
            unCompletedTasks: this.setUncompletedTasks(todo.tasks),
            completedTasks: this.setCompletedTasks(todo.tasks)
        }));
        const todoArray = this.fb.array(todoFGs);
        this.todosFormGroup.setControl('todos', todoArray);
    }

    addEmptyTodo(todo: Todo): void {
        const todoFG = this.fb.group({
            id: null,
            color: 'theme--white',
            name: '',
            hideCheckedItems: false,
            tasks: this.setTodoTasks([]),
            unCompletedTasks: this.setUncompletedTasks([]),
            completedTasks: this.setCompletedTasks([])
        });
        const todoArray = this.todosFA;
        todoArray.push(todoFG);
        this.todosFormGroup.setControl('todos', todoArray);
        // TODO: update db
    }

    makeTodoCopy(todo, index): void {
      const copyTodo = todo.getRawValue();
      const todoFG = this.fb.group({
          id: copyTodo.id + 1,
          color: copyTodo.color,
          name: copyTodo.name,
          tasks: this.setTodoTasks(copyTodo.tasks),
          hideCheckedItems: copyTodo.hideCheckedItems,
          unCompletedTasks: this.setUncompletedTasks(copyTodo.unCompletedTasks),
          completedTasks: this.setCompletedTasks(copyTodo.completedTasks)
      });
      const todoArray = this.todosFA;
      todoArray.insert(index, todoFG);
      this.todosFormGroup.setControl('todos', todoArray);
      // TODO: update db
    }

    addNewTodo(): void {
        this.addEmptyTodo(new Todo());
    }

    setTodoTasks(tasks): FormArray {
        const taskFGs = tasks.map(task => this.fb.group(task));
        const taskArray = this.fb.array(taskFGs);
        return taskArray;
    }

    setUncompletedTasks(tasks: Task[]): FormArray {
        const unCompletedTasks: Task[] = [];
        tasks.forEach((task) => {
            if (!task.completed) {
              unCompletedTasks.push(task);
            }
        });
        const taskFGs = unCompletedTasks.map(task => this.fb.group(task));
        const taskArray = this.fb.array(taskFGs);
        return taskArray;
    }

    setCompletedTasks(tasks: Task[]): FormArray {
        const completedTasks: Task[]  = [];
        tasks.forEach((task) => {
            if (task.completed) {
              completedTasks.push(task);
            }
        });
        const taskFGs = completedTasks.map(task => this.fb.group(task));
        const taskArray = this.fb.array(taskFGs);
        return taskArray;
    }

    get todosFA(): FormArray {
        return this.todosFormGroup.get('todos') as FormArray;
    }

    addUnCompletedTasks(tasks, index): void {
        const textAreas: any = this.textArea.toArray();
        tasks.controls.push(this.fb.group(new Task()));
        this.setFocus(textAreas);
        // TODO: update db
    }

    addToCompletedTasks(tasks, task): void {
        tasks.completedTasks.controls.push(task);
        // TODO: update db
    }

    addToUnCompletedTasks(tasks, task): void {
        tasks.unCompletedTasks.controls.push(task);
        // TODO: update db
    }

    removeUnCompletedTask(task, index): void {
        this.removeFromUnCompletedTasks(task, index);
    }

    removeCompletedTask(task, index): void {
        this.removeFromCompletedTasks(task, index);
    }

    removeItem(event, task, index): void {
      if (event.keyCode === 8) {
        if (!event.srcElement.value) {
          this.removeUnCompletedTask(task, index);
        }
      }
    }
    // TODO: check me from template
    changeTodo(todo, task): void {
        // TODO: save to db
        if (!task.id.value) {
        // TODO: create new
        return;
        }
        // TODO: update new Task Object
        const updateTaskRef: Todo = new Todo();
        // console.log(updateTaskRef)
    }

    markTaskAsCompleted(tasks, task, index, event): void {
        if (event.checked) {
            tasks.completedTasks.push(task);
            this.removeFromUnCompletedTasks(tasks, index);
            // TODO: update db
            // task.completedTask.push()
        } else {
            tasks.unCompletedTasks.push(task);
            this.removeFromCompletedTasks(tasks, index);
            // TODO: update db
        }
    }

    removeFromUnCompletedTasks(tasks, index): void {
        tasks.unCompletedTasks.controls.splice(index, 1);
        // TODO: update db
    }

    removeFromCompletedTasks(tasks, index): void {
        tasks.completedTasks.controls.splice(index, 1);
        // TODO: update db
    }

    changeTheme(tasks, color: string): void {
        tasks.controls.color.setValue(color);
        // TODO: update db
    }

    setFocus(textAreas): void {
      let textAreasCopy = [];
      this.textArea.changes.subscribe((data) => {
        textAreasCopy = data.toArray();
      });
      const ids = [];
      textAreas.forEach(item => {
        ids.push(item.nativeElement.id);
      });
      setTimeout(() => {
        textAreasCopy.forEach((item, index) => {
          if (ids.indexOf(item.nativeElement.id) === -1) {
            textAreasCopy[index].nativeElement.focus();
          }
        });
      }, 200);
    }

    markAllTasksAsCompleted(tasks): void {
      tasks.unCompletedTasks.controls.map((task) => {
        task.controls.completed.setValue(true);
      });
      tasks.unCompletedTasks.controls.map((task) => {
        this.addToCompletedTasks(tasks, task);
      });
      let index = tasks.unCompletedTasks.controls.length - 1;
      while (index >= 0) {
        this.removeFromUnCompletedTasks(tasks, index);
        index = tasks.unCompletedTasks.controls.length - 1;
      }
      // TODO: update db
    }

    markAllTaslsAsInCompleted(tasks): void {
      tasks.completedTasks.controls.map((task) => {
        task.controls.completed.setValue(false);
      });
      tasks.completedTasks.controls.map((task) => {
        this.addToUnCompletedTasks(tasks, task);
      });
      let index = tasks.completedTasks.controls.length - 1;
      while (index >= 0) {
        this.removeFromCompletedTasks(tasks, index);
        index = tasks.completedTasks.controls.length - 1;
      }
      // TODO: update db
    }

    deleteCompletedTasks(tasks): void {
      let index = tasks.completedTasks.controls.length - 1;
      while (index >= 0) {
        this.removeFromCompletedTasks(tasks, index);
        index = tasks.completedTasks.controls.length - 1;
      }
      // TODO: update db
    }

    deleteTodo(todo, index): void {
      this.todosFA.removeAt(index);
       // TODO: update db
    }

    hideCompletedTasks(tasks): void {
      if (tasks.hideCheckedItems.value) {
        tasks.hideCheckedItems.setValue(false);
        // TODO: update db
      } else {
        tasks.hideCheckedItems.setValue(true);
         // TODO: update db
      }
    }

    logChange() {
      const nameControl = this.todosFormGroup.get('todos');
      nameControl.valueChanges.forEach(
        (value: string) => {
          console.log(value);
          this.nameChangeLog.push(value);
        }
      );
    }
}
