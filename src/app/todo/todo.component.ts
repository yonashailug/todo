import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, QueryList, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import { TodoService } from './todo.service';
import { Todo, Task } from './todo.model';
import { Config } from '../config';

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

    todosRef: AngularFireList<any[]>;
    todos: Observable<any[]>;
    todoArray: Todo[] = [];
    todosFormGroup: FormGroup;
    selectedTask: Task;
    hideTasks: string = '';
    nameChangeLog: string[] = [];
    themes = Config.themes;
    cardListInfo: Array<Object> = [];
    showLoder: boolean = true;
    @ViewChildren('textArea') public textArea: QueryList<ElementRef>;
    @ViewChildren('card') public cards: QueryList<ElementRef>;

    constructor(private db: AngularFireDatabase, private todoService: TodoService, private fb: FormBuilder) {}

    ngOnInit() {
      this.createForm();
      this.getTodos();
      // this.logChange();
    }

    createForm(): void {
      this.todosFormGroup = this.fb.group({
        todos: this.fb.array([]),
      });
    }

    getTodos(): void {
      this.todosRef = this.db.list('todos');
      this.todos = this.todosRef.snapshotChanges().map(changes => {
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val() }));
      });
      // this.todos = this.todoService.getData().finally(() => console.log('data arrived!'));
      this.todos.subscribe((todos: Todo[]) => {
          this.showLoder = false;
          this.todoArray = todos;
          this.setTodos(this.todoArray);
      });
    }

    setTodos(todos): void {
      const todoFGs = todos.map(todo => this.fb.group({
        id: todo.key,
        color: todo.color,
        name: todo.name,
        hideCheckedItems: todo.hideCheckedItems,
        tasks: this.setTodoTasks(todo.tasks),
        unCompletedTasks: this.setUncompletedTasks(todo.tasks),
        completedTasks: this.setCompletedTasks(todo.tasks)
      }));
      const todoArray = this.fb.array(todoFGs);
      this.todosCtrl = todoArray;
      // this.cardLayout();
    }

    addEmptyTodo(todo): void {
      const todoFG = this.fb.group({
        id: todo.id,
        color: this.themes[0].className,
        name: todo.name,
        hideCheckedItems: todo.hideCheckedItems,
        tasks: this.setTodoTasks([]),
        unCompletedTasks: this.setUncompletedTasks([]),
        completedTasks: this.setCompletedTasks([])
      });
      this.todosFA.push(todoFG);
      const todoCopyFG = todoFG.getRawValue();
      delete todoCopyFG.unCompletedTasks;
      delete todoCopyFG.completedTasks;
      this.todosRef.push(todoCopyFG);
    }

    makeTodoCopy(todo, index): void {
      const copyTodo = todo.getRawValue();
      const todoFG = this.fb.group({
        id: null,
        color: copyTodo.color,
        name: copyTodo.name,
        tasks: this.setTodoTasks(copyTodo.tasks),
        hideCheckedItems: copyTodo.hideCheckedItems,
        unCompletedTasks: this.setUncompletedTasks(copyTodo.unCompletedTasks),
        completedTasks: this.setCompletedTasks(copyTodo.completedTasks)
      });
      // TODO: update db
      delete copyTodo.unCompletedTasks;
      delete copyTodo.completedTasks;
      this.todosRef.push(copyTodo);
      // this.todosFA.insert(index, todoFG);
    }

    addNewTodo(): void {
      this.addEmptyTodo(new Todo());
      // this.cardLayout();
    }

    setTodoTasks(tasks): FormArray {
      if (!tasks) { return this.fb.array([]); }
      const taskFGs = tasks.map(task => this.fb.group(task));
      const taskArray = this.fb.array(taskFGs);
      return taskArray;
    }

    setUncompletedTasks(tasks: Task[]): FormArray {
      if (!tasks) { return this.fb.array([]); }
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
      if (!tasks) { return this.fb.array([]); }
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

    set todosCtrl(todoArray) {
      this.todosFormGroup.setControl('todos', todoArray);
    }

    addUnCompletedTasks(todo, index): void {
      const textAreas = this.textArea.toArray();
      todo.controls.unCompletedTasks.controls.push(this.fb.group(new Task()));
      this.setFocus(textAreas);
    }

    addToCompletedTasks(todo, task): void {
      todo.controls.completedTasks.controls.push(task);
    }

    addToUnCompletedTasks(todo, task): void {
      todo.controls.unCompletedTasks.controls.push(task);
    }

    removeUnCompletedTask(todo, index): void {
      this.removeFromUnCompletedTask(todo, index);
    }

    removeCompletedTask(todo, index): void {
      this.removeFromCompletedTasks(todo, index);
    }

    removeTask(event, todo, index): void {
      if (event.keyCode === 8) {
        if (!event.srcElement.value) {
          this.removeUnCompletedTask(todo, index);
        }
      }
    }

    changeTodo(key, todo): void {
      const copyTodo = todo.getRawValue();
      const todoConcat = copyTodo.unCompletedTasks.concat(copyTodo.completedTasks);
      delete copyTodo.unCompletedTasks;
      delete copyTodo.completedTasks;
      delete copyTodo.key;
      copyTodo.tasks = todoConcat;
      this.todosRef.update(key, copyTodo);
    }

    markTaskAsCompleted(todo, task, index, event): void {
      if (event.checked) {
        todo.controls.completedTasks.push(task);
        task.controls.completed.setValue(true);
        this.removeFromUnCompletedTask(todo, index);
      } else {
        todo.controls.unCompletedTasks.push(task);
        task.controls.completed.setValue(false);
        this.removeFromCompletedTasks(todo, index);
      }
    }

    removeFromUnCompletedTask(todo, index): void {
      todo.controls.unCompletedTasks.controls.splice(index, 1);
      if (todo) { this.changeTodo(todo.controls.id.value, todo); }
    }

    removeFromCompletedTasks(todo, index): void {
      todo.controls.completedTasks.controls.splice(index, 1);
      if (todo) { this.changeTodo(todo.controls.id.value, todo); }
    }

    deleteUnCompletedTasksFromTodo(todo) {
      if (todo.unCompletedTasks) {
        return delete todo.unCompletedTasks;
      } else {
        return todo;
      }
    }

    deleteCompletedTasksFromTodo(todo) {
      if (todo.completedTasks) {
        return delete todo.completedTasks;
      } else {
        return todo;
      }
    }

    changeTheme(todo, color: string): void {
      todo.controls.color.setValue(color);
      this.changeTodo(todo.controls.id.value, todo);
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

    markAllTasksAsCompleted(todo): void {
      todo.controls.unCompletedTasks.controls.map((task) => {
        task.controls.completed.setValue(true);
      });
      todo.controls.unCompletedTasks.controls.map((task) => {
        this.addToCompletedTasks(todo, task);
      });
      let index = todo.controls.unCompletedTasks.controls.length - 1;
      while (index >= 0) {
        this.removeFromUnCompletedTask(todo, index);
        index = todo.controls.unCompletedTasks.controls.length - 1;
      }
      if (todo) { this.changeTodo(todo.controls.id.value, todo); }
    }

    markAllTaslsAsInCompleted(todo): void {
      todo.controls.completedTasks.controls.map((task) => {
        task.controls.completed.setValue(false);
      });
      todo.controls.completedTasks.controls.map((task) => {
        this.addToUnCompletedTasks(todo, task);
      });
      let index = todo.controls.completedTasks.controls.length - 1;
      while (index >= 0) {
        this.removeFromCompletedTasks(todo, index);
        index = todo.controls.completedTasks.controls.length - 1;
      }
      if (todo) { this.changeTodo(todo.controls.id.value, todo); }
    }

    deleteCompletedTasks(todo): void {
      let index = todo.controls.completedTasks.controls.length - 1;
      while (index >= 0) {
        this.removeFromCompletedTasks(todo, index);
        index = todo.controls.completedTasks.controls.length - 1;
      }
      if (todo) { this.changeTodo(todo.controls.id.value, todo); }
    }

    deleteTodo(key: string, todo, index): void {
      this.todosFA.removeAt(index);
      this.todosRef.remove(key);
      // this.cardLayout();
    }

    hideCompletedTasks(todo): void {
      if (todo.controls.hideCheckedItems.value) {
        todo.controls.hideCheckedItems.setValue(false);
      } else {
        todo.controls.hideCheckedItems.setValue(true);
      }
      if (todo) { this.changeTodo(todo.controls.id.value, todo); }
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

    cardLayout() {
      let cardList = [];
      this.cards.changes.subscribe((data) => {
        cardList = data.toArray();
      });
      setTimeout(() => {
        // console.log(cardList);
        cardList.forEach((item, index) => {
          this.cardListInfo.push({
            index: index,
            width: item.nativeElement.offsetWidth,
            height: item.nativeElement.offsetHeight,
            transformLeft: `translate(${index * item.nativeElement.offsetWidth}, 0)`,
            className: item.nativeElement.classList.value
          });
          // item.nativeElement = `translate(${index*item.nativeElement.offsetWidth},0)`;
        });
      }, 100);
    }
}
