import { TestBed, inject } from '@angular/core/testing';

import { HttpModule } from '@angular/http';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([TodoService], (service: TodoService) => {
    expect(service).toBeTruthy();
  }));
  it('should return ', inject([TodoService], (service: TodoService) => {
    expect(service).toBeTruthy();
  }));
});
