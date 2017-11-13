export class Todo {
    public id: number = 0;
    public color: string = '';
    public name: string = '';
    public tasks: Task[];
    public label: Array<string> = [];
    public hideCheckedItems: boolean = false;
}

export class Task {
    public id: number = 0;
    public completed: boolean = false;
    public archived: boolean  = false;
    public title: string = '';
}

export const todos: any = [{
      'color' : 'theme--white',
      'hideCheckedItems' : false,
      'id' : '-Ky_ahV7RERew_ixkY_B',
      'label' : [ 'Personal', 'Work' ],
      'name' : 'Tommorows task'
    }, {
      'color' : 'theme--white',
      'hideCheckedItems' : false,
      'id' : '-KydmuEkCq1eUqsGszec',
      'label' : [ 'Work', 'Inspiration', 'Personal' ],
      'name' : 'Todays task',
      'tasks' : [ {
        'archived' : false,
        'completed' : false,
        'id' : 0,
        'title' : 'I am inserting this shit'
      }, {
        'archived' : false,
        'completed' : false,
        'id' : 0,
        'title' : 'hello oword'
      }, {
        'archived' : false,
        'completed' : true,
        'id' : 0,
        'title' : 'who cares about the dead fish'
      }]
    }, {
      'color' : 'theme--red-light',
      'hideCheckedItems' : false,
      'id' : '-KydmwwGOtBkQblRysim',
      'label' : [ 'Work', 'Inspiration' ],
      'name' : 'Todays task',
      'tasks' : [ {
        'archived' : false,
        'completed' : false,
        'id' : 0,
        'title' : 'I am inserting this shit'
      }, {
        'archived' : false,
        'completed' : true,
        'id' : 0,
        'title' : 'hello oword'
      }, {
        'archived' : false,
        'completed' : true,
        'id' : 0,
        'title' : 'who cares about the dead fish'
      }]
    }];
