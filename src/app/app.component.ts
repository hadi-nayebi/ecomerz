import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Ecomerz';
  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router
  ) {
    auth.user$.subscribe((user) => {
      if (user) {
        if (auth.isNewUser()) {
          userService.save(user);
        } else userService.update(user);
        let returnUrl = <string>localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    });
  }
}
