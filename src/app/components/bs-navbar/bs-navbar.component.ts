import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent {
  constructor(private _auth: AuthService) {}

  get auth() {
    return this._auth;
  }

  logout() {
    this._auth.logout();
  }
}
