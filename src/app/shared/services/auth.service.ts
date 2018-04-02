import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from 'firebase/app';

@Injectable()
export class AuthService {
    user: User;
    constructor(private afAuth: AngularFireAuth) {}

    public signInWithGoogle() {
        return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    public getUser() {
        return this.afAuth.authState;
    }
    public getCurrentUser(): User {
        this.initCurrentUser();
        return this.user;
    }
    public initCurrentUser() {
        this.user = this.afAuth.auth.currentUser;
    }
    public signOut() {
        this.afAuth.auth.signOut();
    }
}
