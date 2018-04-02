import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class EventEmitterService {

    private uploadProgress = new BehaviorSubject<number>(0);
    public uploadProgressChanges = this.uploadProgress.asObservable();

    public setUploadProgress(value: number) {
        this.uploadProgress.next(value);
    }
    public getUploadProgress(): number {
        return this.uploadProgress.value;
    }
}
