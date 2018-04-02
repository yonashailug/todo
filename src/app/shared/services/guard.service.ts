import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/take';

@Injectable()
export class GuardService implements CanActivate {

    constructor(private afAuth: AngularFireAuth,
        private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.afAuth.authState.map((userAuthState) => {
            if (!userAuthState) { return false; }
                return true;
            }).take(1);
    }
}
