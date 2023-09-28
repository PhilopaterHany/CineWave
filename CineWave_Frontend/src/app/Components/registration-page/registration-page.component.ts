import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css'],
})
export class RegistrationPageComponent {

  signUpClicked: Boolean = false;
  loginClicked: Boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    re_password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
  });

  login() {
    // Handle login logic
    this.loginClicked = true;
    console.log('Logging in...');

    if(this.validateLoginData()){
      // send request to the backend server ..
      this.loginForm.reset();
      this.loginClicked = false;
    }
  }

  signup() {
    // Handle signup logic
    this.signUpClicked = true;
    console.log('Signing up...');

    if(this.validateSignUpData()) {
      // send request to the backend server ..
      this.signupForm.reset();
      this.signUpClicked = false;
    }
  }

  validateSignUpData() {
    let good = true;
    Object.keys(this.signupForm.value).map((key) => {
      if(this.signupForm.get(key)?.invalid)
        good = false;
    })
    return good;
  }

  validateLoginData() {
    let good = true;
    Object.keys(this.loginForm.value).map((key) => {
      if(this.loginForm.get(key)?.invalid)
        good = false;
    })
    return good;
  }
}
