import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseStorageService } from '../services/firebase.storage.service';

@Pipe({name: 'mediaUrl'})
export class MediaUrlPipe implements PipeTransform {

  constructor(private firebaseStorageService: FirebaseStorageService) {}

  transform(filename: string, type: string): string {
    if (!filename) {
      return '';
    }
    return this.firebaseStorageService.getImageUrl(filename);
  }
}
