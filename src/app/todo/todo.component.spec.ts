import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatMenuModule, MatListModule, MatCardModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { 
  HttpModule, 
  XHRBackend,
  ResponseOptions,
  Response,
  RequestMethod } from '@angular/http';
import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

import { TodoComponent } from './todo.component';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

class MockAngularFireDatabase extends AngularFireDatabase {}
class MockFirebaseApp {}
const todos: any[] = [{
  'id': 1,
  'color': 'theme--white',
  'name': 'Todays task',
  'hideCheckedItems': false,
  'tasks': [
    {
      'id': 1,
      'completed': true,
      'archived': false,
      'title': 'Watch acts of vengeance'
    }, {
        'id': 2,
        'completed': false,
        'archived': false,
        'title': 'Read quora posts'
    }, {
        'id': 3,
        'completed': false,
        'archived': false,
        'title': 'Write blog post on medium'
      }]
    }, {
      'id': 2,
      'color': 'theme--yellow-light',
      'name': 'yesterdays task',
      'hideCheckedItems': true,
      'tasks': [{
          'id': 1,
          'completed': true,
          'archived': false,
          'title': 'Call to unknown',
      }, {
          'id': 2,
          'completed': false,
          'archived': false,
          'title': 'Continuous integration with Travis',
      }]
    }
];


describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let afdbMock = {
    database: {
      list: () => {}
    } 
  };
  //Observable.of(todos.map(t => { return {value: t}}))
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatMenuModule,
        MatListModule,
        MatCardModule,
        HttpModule
      ],
      providers: [
        TodoService,
        {
            provide: AngularFireDatabase,
            useValue: afdbMock
        },
        {
          provide: FirebaseApp,
          useValue: afdbMock
        },
        {
          provide: XHRBackend, 
          useClass: MockBackend
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  // it(`should call 'getTodos()' method`, () => {
  //   spyOn(component, 'getTodos');
  //   component.ngOnInit();
  //   expect(component.getTodos).toHaveBeenCalled();
  // });

  // it(`should call 'createForm()' method`, () => {
  //   spyOn(component, 'createForm');
  //   component.ngOnInit();
  //   expect(component.createForm).toHaveBeenCalled();
  // });

  // it(`should have todos instance of Observable`, () => {
  //   expect(component.todos instanceof Observable).toBeTruthy();
  // });
});
