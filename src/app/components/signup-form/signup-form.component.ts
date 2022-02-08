import { UsernameValidators } from './username.validators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(3),
        UsernameValidators.connotContainSpace,
      ],
      [UsernameValidators.shouldBeUnique]
    ),
    password: new FormControl('', Validators.required),
  });
  constructor() {}

  ngOnInit(): void {}

  login() {
    let isValid = false;
    if (!isValid) {
      this.form.setErrors({
        invalidLogin: true,
      });
    }
  }

  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }
}
