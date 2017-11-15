export class Media {

    public $key: string;
    public file: File;
    public name: string;
    public url: string;
    public progress: number;
    public createdAt: Date = new Date();

    constructor(file: File) {
      this.file = file;
    }

}
