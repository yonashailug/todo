import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatMenuModule, MatListModule, MatCardModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { TodoComponent } from './todo.component';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

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
        HttpModule],
        providers: [TodoService]
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

  it(`should call 'getTodos()' method`, () => {
    spyOn(component, 'getTodos');
    component.ngOnInit();
    expect(component.getTodos).toHaveBeenCalled();
  });

  it(`should call 'createForm()' method`, () => {
    spyOn(component, 'createForm');
    component.ngOnInit();
    expect(component.createForm).toHaveBeenCalled();
  });

  it(`should todos instance of Observable`, () => {
    expect(component.todos instanceof Observable).toBeTruthy();
  });
});
