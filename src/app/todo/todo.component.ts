import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { trigger, transition, style, animate } from '@angular/animations';
import 'rxjs/add/operator/finally';

import { TodoService } from './todo.service';
import { Task, TaskItem } from './todo-model';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss'],
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

    tasksData: Observable<Task[]>;
    tasksDataArray: Task[] = [];
    tasksFormGroup: FormGroup;
    selectedTask: Task;
    hideTodos: string = "";
    @ViewChildren('textArea') public textArea: QueryList<ElementRef>; 
    
    constructor(private todoService: TodoService, private fb: FormBuilder) {}

    ngOnInit() {
        this.getTasks();
        this.createForm();
    }

    createForm():void{
        this.tasksFormGroup = this.fb.group({
            tasks: this.fb.array([]),
        });
    }

    getTasks():void {
        this.tasksData = this.todoService.getData()
                        .finally(() => {console.log("data fetched!")});
        this.tasksData.subscribe((tasks: Task[]) => {  
            this.tasksDataArray = tasks;
            this.setTasks(this.tasksDataArray);
        })        
    }

    setTasks(tasks: Task[]):void {
        const tasksFGs = tasks.map(task => this.fb.group({
            id: task.id,
            color: task.color,
            name: task.name,
            task: this.setTaskItems(task.task),
            hideCheckedItems: task.hideCheckedItems,
            unCompletedTask: this.setUncompletedTaskItems(task.task),
            completedTask: this.setCompletedTaskItems(task.task)
        }));
        const tasksFormArray = this.fb.array(tasksFGs);
        this.tasksFormGroup.setControl('tasks', tasksFormArray);
    }

    addEmptyTask(task: Task):void {
        const tasksFG = this.fb.group({
            id: null,
            color: 'theme--white',
            name: '',
            task: this.setTaskItems([]),
            hideCheckedItems: false,
            unCompletedTask: this.setUncompletedTaskItems([]),
            completedTask: this.setCompletedTaskItems([])
        })
        let tasksFormArrays = this.tasks;
        tasksFormArrays.push(tasksFG);
        this.tasksFormGroup.setControl('tasks', tasksFormArrays);  
        // TODO: update db
    }

    makeATaskCopy(task, index) {
      let copyTask = task.getRawValue();
      const tasksFG = this.fb.group({
          id: copyTask.id + 1,
          color: copyTask.color,
          name: copyTask.name,
          task: this.setTaskItems(copyTask.task),
          hideCheckedItems: copyTask.hideCheckedItems,
          unCompletedTask: this.setUncompletedTaskItems(copyTask.unCompletedTask),
          completedTask: this.setCompletedTaskItems(copyTask.completedTask)
      })
      let tasksFormArrays = this.tasks;
      tasksFormArrays.push(tasksFG);
      this.tasksFormGroup.setControl('tasks', tasksFormArrays);
      // TODO: update db
    }

    addNewTask():void {
        this.addEmptyTask(new Task()); 
    }

    setTaskItems(taskItems: TaskItem[]):FormArray {
        const taskItemsFGs = taskItems.map(task => this.fb.group(task));
        const taskItemsFormArray = this.fb.array(taskItemsFGs);
        return taskItemsFormArray;
    }

    setUncompletedTaskItems(taskItems: TaskItem[]):FormArray {
        let unCompletedTask:TaskItem[]  = [];
        taskItems.forEach((task) => {
            if(!task.completed) {
                unCompletedTask.push(task);
            }
        })
        const taskItemsFGs = unCompletedTask.map(task => this.fb.group(task));
        const taskItemsFormArray = this.fb.array(taskItemsFGs);
        return taskItemsFormArray;
    }

    setCompletedTaskItems(taskItems: TaskItem[]):FormArray {
        let completedTask:TaskItem[]  = [];
        taskItems.forEach((task) => {
            if(task.completed) {
                completedTask.push(task);
            }
        })
        const taskItemsFGs = completedTask.map(task => this.fb.group(task));
        const taskItemsFormArray = this.fb.array(taskItemsFGs);
        return taskItemsFormArray;
    }
    
    get tasks(): FormArray {
        return this.tasksFormGroup.get('tasks') as FormArray;
    };

    get task(): FormArray {
        return this.tasksFormGroup.get('task') as FormArray;
    };

    addUnCompletedTasks(task,index):void {
        let textAreas:any = this.textArea.toArray();
        task.controls.push(this.fb.group(new TaskItem()));
        this.setFocus(textAreas);
        // TODO: update db
    }

    addToCompletedTasks(tasks,item):void {
        tasks.completedTask.controls.push(item);
        // TODO: update db
    }

    addToUnCompletedTasks(tasks,item):void {
        tasks.unCompletedTask.controls.push(item);
        // TODO: update db
    }

    removeUnCompletedTask(task, index):void {
        this.removeFromUnCompletedTasks(task,index);
    }

    removeCompletedTask(task, index):void {
        this.removeFromCompletedTasks(task,index);
    }

    removeItem(event,task,index):void {
      if(event.keyCode == 8) {
        if(!event.srcElement.value) {
          this.removeUnCompletedTask(task,index);
        }
      }
    }

    changeTask(task, item):void {
        // TODO: save to db   
        if(!item.id.value) {
        // TODO: create new 
        return;
        }
        // TODO: update new Task Object
        let updateTaskRef: Task = new Task();
        // console.log(updateTaskRef)
    }

    markTaskAsCompleted(task,item,index, event):void {
        if(event.checked) {
            task.completedTask.push(item);
            this.removeFromUnCompletedTasks(task,index);
            // TODO: update db
            // task.completedTask.push()
        } else {
            task.unCompletedTask.push(item);
            this.removeFromCompletedTasks(task,index);
            // TODO: update db
        }
    }

    removeFromUnCompletedTasks(task,index):void {
        task.unCompletedTask.controls.splice(index,1);
        // TODO: update db
    }

    removeFromCompletedTasks(task,index):void {
        task.completedTask.controls.splice(index,1);
        // TODO: update db
    }

    changeTheme(task, color: string):void {
        task.controls.color.setValue(color);
        // TODO: update db
    }

    setFocus(textAreas):void {   
      let textAreasCopy = [];   
      this.textArea.changes.subscribe((data)=>{
        textAreasCopy = data.toArray();
      })
      let ids = [];
      textAreas.forEach(item => {
        ids.push(item.nativeElement.id);
      });
      setTimeout(() => {
        textAreasCopy.forEach((item,index)=> {
          if(ids.indexOf(item.nativeElement.id) == -1) {
            textAreasCopy[index].nativeElement.focus();
          }
        });
      }, 200);
    }

    markAllTasksAsCompleted(tasks):void {
      tasks.unCompletedTask.controls.map((task) => {
        task.controls.completed.setValue(true);
      });
      tasks.unCompletedTask.controls.map((item) => {
        this.addToCompletedTasks(tasks, item);
      });
      let index = tasks.unCompletedTask.controls.length - 1;
      while(index>=0) {
        this.removeFromUnCompletedTasks(tasks, index);
        index = tasks.unCompletedTask.controls.length - 1;
      }
      // TODO: update db
    }

    markAllTaslsAsInCompleted(tasks):void{
      tasks.completedTask.controls.map((task) => {
        task.controls.completed.setValue(false);
      });
      tasks.completedTask.controls.map((item) => {
        this.addToUnCompletedTasks(tasks, item);
      });
      let index = tasks.completedTask.controls.length - 1;
      while(index>=0) {
        this.removeFromCompletedTasks(tasks, index);
        index = tasks.completedTask.controls.length - 1;
      }
      // TODO: update db
    }

    deleteCompletedItems(tasks):void {
      let index = tasks.completedTask.controls.length - 1;
      while(index>=0) {
        this.removeFromCompletedTasks(tasks, index);
        index = tasks.completedTask.controls.length - 1;
      }
      // TODO: update db
    }

    deleteTask(task, index):void {
      this.tasks.removeAt(index);
       // TODO: update db
    }

    makeTaskCopy(task,index):void {
      console.log(task);
      // this.tasks.insert(index,this.makeATaskCopy(task.controls));
       // TODO: update db
    }

    hideCompletedTodos(task):void {
      if(task.hideCheckedItems.value) {
        task.hideCheckedItems.setValue(false);
        // TODO: update db
      } 
      else {
        task.hideCheckedItems.setValue(true);
         // TODO: update db
      }
    }
}