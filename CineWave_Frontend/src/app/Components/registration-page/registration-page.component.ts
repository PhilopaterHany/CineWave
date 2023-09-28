import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {User} from "../../Interfaces/user";
import {ServerCallerService} from "../../Services/server-caller.service";
import {Router} from "@angular/router";
import {UtilitiesService} from "../../Services/utilities.service";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css'],
})
export class RegistrationPageComponent {

  constructor(
    private serverCaller: ServerCallerService,
    private router: Router,
    public utilitiesService: UtilitiesService,
    ) {
  }

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

  async login() {
    // Handle login logic
    this.loginClicked = true;
    console.log('Logging in...');

    if(this.validateLoginData()){
      // the this.loginForm.value contain the form values, which are email and password
      let user: User = await this.serverCaller.signIn(<User> this.loginForm.value)
      console.log('Returned User: ', user);
      if(user != null) {
        this.loginClicked = false;
        this.utilitiesService.setCurrentUser(user);
        this.navigateToHome();
        console.log("Here");
      } else
        this.loginForm.reset();
    }
  }

  async signup() {
    // Handle signup logic
    this.signUpClicked = true;
    console.log('Signing up...');

    if(this.validateSignUpData()) {
      // the this.signupForm.value contain the form values, which are email, username and password
      let newUser: User = await this.serverCaller.signUp(<User>this.signupForm.value);
      console.log(newUser);
      if(newUser != null){
        this.signUpClicked = false;
        this.utilitiesService.setCurrentUser(newUser);
        this.navigateToHome();
      } else
        this.signupForm.reset();
    }
  }

  validateSignUpData() {
    let good = true;
    if(this.signupForm.get('password') != this.signupForm.get('re_password'))
      this.signupForm.get('re_password')?.reset();
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

  navigateToHome(){
    this.router.navigate(['/']);
  }
}
