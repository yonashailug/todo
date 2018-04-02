import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './shared/services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './shared/model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular 4 Todo App';
  user: User;
  isMenuToggled: boolean = false;
  labels: Array<string> = ['Work', 'Inspiration', 'Personal'];
  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router) {
      this.authService.getUser().subscribe((user) => {
        if (user === null) {
          this.user = new User();
          this.router.navigate(['/signin']);
        } else {
          this.user = new User();
          this.user.setName(user.displayName);
          this.user.setEmail(user.email);
          this.user.setPhotoUrl(user.photoURL);
          this.user.setIsLoggedIn(true);
          this.router.navigate(['/todo']);
        }
      });
    }

  signOut() {
    this.authService.signOut();
    this.router.navigate(['/signin']);
  }

  toggleMenu() {
    if (this.isMenuToggled) {
      this.isMenuToggled = false;
    } else {
      this.isMenuToggled = true;
    }
  }
  changeLabel(label?: string) {
    if (!label || label === 'home') {
      this.isMenuToggled = false;
      this.router.navigate(['/todo', 'home']);
    } else {
      this.isMenuToggled = false;
      this.router.navigate(['/todo', label]);
    }
  }  
}
