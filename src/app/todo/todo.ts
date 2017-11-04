export class Todo {
    public id: number;
    public userId: number;
    public title: string;
    public completed: boolean;
    public archived: boolean;

    public static fromObject(obj): Todo {
        const todo: Todo = new Todo();
        Object.assign(todo, obj);
        return todo;
    }

    getId(): number {
        return this.id;
    }
    setId(value: number) {
        this.id = value;
    }
    getUserId(): number {
        return this.userId;
    }
    setUserId(value: number) {
        this.userId = value;
    }
    getTitle(): string {
        return this.title;
    }
    setTitle(value: string) {
        this.title = value;
    }
    getCompleted(): boolean {
        return this.completed;
    }
    setCompleted(value: boolean) {
        this.completed = value;
    }
    getArchived(): boolean {
        return this.archived;
    }
    setArchived(value: boolean) {
        this.archived = value;
    }
}
