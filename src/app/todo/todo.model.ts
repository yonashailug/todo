export class Todo {
    public id: number = 0;
    public color: string = '';
    public name: string = '';
    public tasks: Task[];
    public hideCheckedItems: boolean = false;
}
export class Task {
    public id: number = 0;
    public completed: boolean = false;
    public archived: boolean  = false;
    public title: string = '';
}
export const todos: Todo[] = [
    {
        'id': 1,
        'color': 'theme--white',
        'name': 'Todays task',
        'hideCheckedItems': false,
        'tasks': [{
            'id': 1,
            'completed': true,
            'archived': false,
            'title': 'Express JS'
        }, {
            'id': 2,
            'completed': false,
            'archived': false,
            'title': 'Node JS'
        }]
    }, {
        'id': 2,
        'color': 'theme--yellow-ligh',
        'name': 'yesterdays task',
        'hideCheckedItems': true,
        'tasks': [{
            'id': 1,
            'completed': false,
            'archived': false,
            'title': 'Hapi JS',
        }, {
            'id': 2,
            'completed': true,
            'archived': false,
            'title': 'Travis CI',
        }]
    }
];
