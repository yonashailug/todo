export class Task {
    public id: number = 0;
    public color: string = '';
    public name: string = '';
    public task: TaskItem[];
    public hideCheckedItems: boolean = false;
}
export class TaskItem {
    public id: number = 0;
    public completed: boolean = false;
    public archived: boolean  = false;
    public title: string = '';
}
export const tasks: Task[] = [
    {
        'id': 1,
        'color': 'theme--white',
        'name': 'Todays task',
        'hideCheckedItems': false,
        'task': [{
            'archived': false,
            'id': 1,
            'title': 'Express JS',
            'completed': true
        }, {
            'archived': false,
            'id': 2,
            'title': 'Node JS',
            'completed': false
        }]
    }, {
        'id': 2,
        'color': 'theme--blue',
        'name': 'yesterdays task',
        'hideCheckedItems': true,
        'task': [{
            'archived': false,
            'id': 1,
            'title': 'Hapi JS',
            'completed': false
        }, {
            'archived': false,
            'id': 2,
            'title': 'Travis CI',
            'completed': true
        }]
    }
];
