import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, QueryList, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/startWith';
import * as firebase from 'firebase';

import { TodoService } from './todo.service';
import { Todo, Task } from './todo.model';
import { Config } from '../shared/config';
import { Media, MessageInfo } from '../shared/model';
import { AuthService } from '../shared/services/auth.service';
import { EventEmitterService } from '../shared/services/event-emitter.service';
import { SnackBarService } from '../shared/services/snackbar.service';
import { GlobalNotificationService } from '../shared/component/global-notification/global-notification.service';

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
    tasksRef: AngularFireObject<any>;
    todos: Observable<any[]>;
    tasks: Observable<any[]>;
    todoArray: Todo[] = [];
    todoArrayForFilter: Todo[] = [];
    todosFormGroup: FormGroup;
    selectedTask: Task;
    hideTasks: string = '';
    nameChangeLog: string[] = [];
    themes = Config.themes;
    cardListInfo: Array<Object> = [];
    filteredLabels: string[] = Config.defaultLabels;
    defaultLabels: string[] = Config.defaultLabels;
    availableLabels: string[] = [];
    filterLabelsFormControl: FormControl;
    filterTodosFormControl: FormControl;
    showLoder: boolean = true;
    labelId: string = '';
    labelToAdd: string = '';
    routeId: string = '';
    todosSubscription: any;
    fullScreenClass: boolean = false;
    FORM_CONTROL_NAME: string = Config.FORM_CONTROL_NAME;
    // uploadProgress: any = { percent: 0,  key: '' };
    uploadProgress: number = 0;
    uploadId: string = '';
    messageInfo: MessageInfo;
    @ViewChildren('textArea') public textArea: QueryList<ElementRef>;
    @ViewChildren('card') public cards: QueryList<ElementRef>;

    constructor(private route: Router,
      private router: ActivatedRoute,
      private db: AngularFireDatabase,
      private todoService: TodoService,
      private authService: AuthService,
      private snackBarService: SnackBarService,
      private globalNotificationService: GlobalNotificationService,
      private fb: FormBuilder,
      private eventEmitterService: EventEmitterService) {
        this.globalNotificationService.messageInfoChanges.subscribe((messageInfo: MessageInfo) => {
            this.messageInfo = messageInfo;
        });
      }

    ngOnInit() {
      this.createForm();
      this.filterLabelsFormControl = new FormControl();
      this.filterTodosFormControl = new FormControl();
      this.todosSubscription = this.router.params.subscribe(params => {
        this.routeId = params['id'];
        if (this.routeId) {
          this.showTodosByLabel(this.routeId);
        }
      });
      this.getTodos();
      // this.logChange();
    }

    createForm(): void {
      this.todosFormGroup = this.fb.group({
        todos: this.fb.array([]),
      });
    }

    getTodos(): void {
      this.todoService.getTodos().subscribe((todos: Todo[]) => {
        this.showLoder = false;
        this.todoArray = todos.reverse();
        this.todoArrayForFilter = todos.reverse();
        this.showTodosByLabel(this.routeId);
      }, error => {
        this.messageInfo = new MessageInfo();
        let message: string = '';
        switch (error.code) {
          case 'auth/network-request-failed':
          message = 'A network error has occurred.';
          break;
        }
        this.messageInfo.setMessageBody(message);
        this.messageInfo.setIsError(true);
        this.setNotificationMessage(this.messageInfo);
      });
      // TODO: remove me please just for debugging purpose
      // this.todoService.getLocalData().subscribe((todos: Todo[]) => {
      //   this.showLoder = false;
      //   this.todoArray = todos.reverse();
      //   this.todoArrayForFilter = todos.reverse();
      //   this.showTodosByLabel(this.routeId);
      // });
    }

    getLabels(todos): string[] {
      const labels: string[] = this.filteredLabels;
      todos.forEach(todo => {
        if (!todo.label) {
          return [];
        }
        todo.label.forEach(label => {
          if (-1 === labels.indexOf(label)) {
            labels.push(label);
          }
        });
      });
      this.availableLabels = labels;
      return labels;
    }

    getTask(key) {
      this.db.object(`tasks/${key}`).snapshotChanges().subscribe((task) => {
        console.log(task.payload.val());
        return task.payload.val();
      });
    }

    setTodos(todos): void {
      const todoFGs = todos.map(todo => this.fb.group({
        id: todo.key,
        color: todo.color,
        name: todo.name,
        uid: todo.uid,
        mediaUrl: todo.mediaUrl || '',
        label: this.setTodoLabels(todo.label),
        hideCheckedItems: todo.hideCheckedItems,
        tasks: this.setTodoTasks(todo.tasks),
        unCompletedTasks: this.setUncompletedTasks(todo.tasks),
        completedTasks: this.setCompletedTasks(todo.tasks),
        dateUpdated: todo.dateUpdated,
        dateCreated: todo.dateCreated
      }));
      const todoArray = this.fb.array(todoFGs);
      this.todosCtrl = todoArray;
      // console.log(this.getTask(todos[0].id));
      // setTimeout(() => {
      //   if (this.getTask(todos[0].id)) {
      //     console.log(this.getTask(todos[0].id));
      //   }
      // }, 500);
      // this.cardLayout();
    }

    addEmptyTodo(todo): void {
      const todoFG = this.fb.group({
        id: todo.id,
        color: this.themes[0].className,
        name: todo.name,
        uid: this.authService.getCurrentUser().uid,
        mediaUrl: todo.mediaUrl || '',
        label: this.setTodoLabels(this.routeId === 'home' ? [] : [this.routeId]),
        hideCheckedItems: todo.hideCheckedItems,
        tasks: this.setTodoTasks([]),
        unCompletedTasks: this.setUncompletedTasks([]),
        completedTasks: this.setCompletedTasks([])
      });
      this.todosFA.insert(0, todoFG);
      const todoCopyFG = todoFG.getRawValue();
      delete todoCopyFG.unCompletedTasks;
      delete todoCopyFG.completedTasks;
      todoCopyFG.dateUpdated = {};
      todoCopyFG.dateCreated = {};
      todoCopyFG.dateUpdated.time = firebase.database.ServerValue.TIMESTAMP;
      todoCopyFG.dateCreated.time = firebase.database.ServerValue.TIMESTAMP;
      this.todoService.createTodo(todoCopyFG);
    }

    makeTodoCopy(todo, index): void {
      const copyTodo = todo.getRawValue();
      const todoFG = this.fb.group({
        id: null,
        color: copyTodo.color,
        name: copyTodo.name,
        uid: copyTodo.uid,
        mediaUrl: copyTodo.mediaUrl,
        label: this.setTodoLabels(copyTodo.label),
        tasks: this.setTodoTasks(copyTodo.tasks),
        hideCheckedItems: copyTodo.hideCheckedItems,
        unCompletedTasks: this.setUncompletedTasks(copyTodo.unCompletedTasks),
        completedTasks: this.setCompletedTasks(copyTodo.completedTasks),
        dateCreated: copyTodo.dateCreated,
        dateUpdated: {
          time: firebase.database.ServerValue.TIMESTAMP
        }
      });
      // TODO: update db
      this.todosFA.insert(index, todoFG);
      delete copyTodo.unCompletedTasks;
      delete copyTodo.completedTasks;
      this.todoService.createTodo(copyTodo);
    }

    updateLabels(key, todo, event, label) {
      if (event.checked) {
        todo.controls.label.value.push(label);
        todo.controls.label.controls.push(this.fb.control(label));
      } else {
        todo.controls.label.controls.forEach((labelRef, index) => {
          if (labelRef.value === label) {
            todo.controls.label.controls.splice(index, 1);
          }
        });
        todo.controls.label.value.forEach((labelRef, index) => {
          if (labelRef === label) {
            todo.controls.label.value.splice(index, 1);
          }
        });
      }
    }

    addToLabel(todo, label) {
      todo.controls.label.controls.push(this.fb.control(label));
      todo.controls.label.value.push(label);
      this.availableLabels.push(label);
      this.filteredLabels = this.availableLabels;
    }

    searchTodos(keyword: string) {
      // console.log(keyword);
      this.filterTodosFormControl.valueChanges
      .startWith(null)
      .subscribe(label => { this.setTodos(this.filterTodos(label)); });
    }

    changeColorByFilter(colorName: string) {
      this.setTodos(this.filterByColor(colorName));
    }

    filterByColor(colorName: string) {
      if (colorName) {
        return this.todoArrayForFilter.filter((filter) => new RegExp(`^${colorName}`, 'gi').test(filter.color));
      } else {
        return this.todoArrayForFilter;
      }
    }
    // TODO: filter by label with ui init
    filterByLabel() {}

    filterTodos(keyword: string) {
      if (keyword) {
        return this.todoArrayForFilter.filter((filter) => {
          const name = new RegExp(`^${keyword}`, 'gi').test(filter.name);
          // const label = filter.label.filter(label => new RegExp(`${keyword}`, 'gi').test(label));
          if (name) {
            return name;
          }
          // if (label) {
          //   return label;
          // }
        });
      } else {
        return this.todoArrayForFilter;
      }
    }

    startFilter() {
      this.filterLabelsFormControl.valueChanges
      .startWith(null)
      .subscribe(label => { this.filteredLabels = this.filterLabels(label); });
    }

    filterLabels(label: string) {
      this.labelToAdd = label;
      return label ? this.defaultLabels.filter((filter) => new RegExp(`^${label}`, 'gi').test(filter)) : this.defaultLabels;
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

    setTodoLabels(labels): FormArray {
      if (!labels) { return this.fb.array([]); }
      const taskFGs = labels.map(label => this.fb.control(label));
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
      return this.todosFormGroup.get(this.FORM_CONTROL_NAME) as FormArray;
    }

    set todosCtrl(todoArray) {
      this.todosFormGroup.setControl(this.FORM_CONTROL_NAME, todoArray);
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
      copyTodo.dateUpdated = {};
      copyTodo.dateUpdated.time = firebase.database.ServerValue.TIMESTAMP;
      this.todoService.updateTodo(key, copyTodo);
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

    deleteTodo(key: string, index): void {
      this.todosFA.removeAt(index);
      this.todoService.removeTodo(key);
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
      const nameControl = this.todosFormGroup.get(this.FORM_CONTROL_NAME);
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

    openLabelMenu(id: string) {
      this.filterLabelsFormControl.setValue('');
      this.labelId === id ? this.labelId = '' : this.labelId = id;
    }

    showTodosByLabel(label?: string) {
      const todoArrayFiltered: Todo[] = [];
      if (!label || label === 'home') {
        this.setTodos(this.todoArray);
        this.filteredLabels = this.getLabels(this.todoArray);
        this.route.navigate(['/todo', 'home']);
      } else {
        this.route.navigate(['/todo', label]);
        this.todoArray.forEach(todo => {
          if (todo.label && -1 !== todo.label.indexOf(label)) {
            todoArrayFiltered.push(todo);
            this.setTodos(todoArrayFiltered);
            this.filteredLabels = this.getLabels(this.todoArray);
          }
        });
      }
    }

    uploadMedia(key, event) {
      const fileList = event.target.files;
      const file = fileList.item(0);
      const media = new Media(file);
      this.uploadProgress = 1;
      this.uploadId = key;
      this.todoService.uploadMedia(key, media);
      this.eventEmitterService.uploadProgressChanges.subscribe((progress) => {
        this.uploadProgress += progress;
      });
    }

    fullScreenSearch() {
      this.fullScreenClass = true;
    }

    closeFullScreenSearch() {
      this.fullScreenClass = false;
      this.filterTodosFormControl.reset('');
      this.setTodos(this.todoArray);
    }
    setNotificationMessage(messageInfo: MessageInfo) {
      this.globalNotificationService.setNotificationMessage(messageInfo);
    }
}

