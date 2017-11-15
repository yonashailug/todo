import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as firebase from 'firebase/app';

@Injectable()
export class FirebaseStorageService {

  private FIREBASE_STORAGE_API_URL = 'https://storage.googleapis.com/';
  constructor() {}
  private getImagesUrl(): string {
    return `${this.FIREBASE_STORAGE_API_URL}${environment.firebase.storageBucket}`;
  }

  public getImageUrl(filename: string): string {
    return `${this.getImagesUrl()}/${filename}`;
  }

}


