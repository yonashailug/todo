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

export const todos: any[] = [{
        'id': 1,
        'color': 'theme--white',
        'name': 'Todays task',
        'hideCheckedItems': false,
        'tasks': [{
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
