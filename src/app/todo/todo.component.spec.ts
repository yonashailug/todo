import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatMenuModule,MatListModule, MatCardModule } from '@angular/material';
import { HttpModule } from '@angular/http';

import { TodoComponent } from './todo.component';
import { TodoService } from './todo.service';

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
});
