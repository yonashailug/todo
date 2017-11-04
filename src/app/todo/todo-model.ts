export class Task {
    id:number = 0;
    color:string= "";
    name:string = "";
    task:TaskItem[];
    hideCheckedItems:boolean = false;
}
    
export class TaskItem {
    id: number = 0;
    completed:boolean = false;
    archived:boolean  = false;
    title:string = '';
}
    
export const tasks: Task[] = [
    {
        "id": 1,
        "color": "theme--white",
        "name": "Today's task",
        "hideCheckedItems": false,
        "task": [{
            "archived": false,
            "id": 1,
            "title": "Express JS",
            "completed": true
        }, {
            "archived": false,
            "id": 2,
            "title": "Node JS",
            "completed": false
        }]
    }, {
        "id": 2,
        "color": "theme--blue",
        "name": "yesterday's task",
        "hideCheckedItems": true,
        "task": [{
            "archived": false,
            "id": 1,
            "title": "Hapi JS",
            "completed": false
        }, {
            "archived": false,
            "id": 2,
            "title": "Travis CI",
            "completed": true
        }]
    }
]