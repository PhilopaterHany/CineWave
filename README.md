<h1 align="center">
    CineWave
    <br />
    <br />
    Riding The Sine Waves Of Cinematic Brilliance
</h1>

![Preview](./design/desktop-preview.jpg)

## Table of contents

-   [Overview](#overview)
    -   [The challenge](#the-challenge)
    -   [Links](#links)
-   [Our process](#our-process)
    -   [Built with](#built-with)
    -   [What we learned](#what-we-learned)
    -   [Useful resources](#useful-resources)
    -   [How To Use](#how-to-use)
-   [Authors](#authors)

## Overview

CineWave is a web application built using Angular and Java Spring Boot. It allows users to register, log in, search for movies or series, and manage their watched and favorite lists. The application integrates with the OMDB API for movie and series data and uses MongoDB for user database management.
PS: Some movies might not display correctly as expected, due to lack of data from the API. This will be fixed later and they will be filtered out.

### The challenge

Users should be able to:

-   Register and log in to their accounts.
-   Delete their accounts completely.
-   Search for movies or series and view detailed information.
-   Add movies or series to their watched list.
-   Add movies or series to their favorites list.
-   View their watched or favorites pages and search for movies there.

### Links

-   Live Site URL: [Github Pages](https://philopaterhany.github.io/CineWave/)
-   LinkedIn Post Containing the Demo Video: [Post]()

## Our process

### Built with

-   Semantic HTML5 Markup
-   CSS Custom Properties
-   AngularJS
-   TypeScript
-   Java Spring Boot
-   MongoDB
-   Postman API (for testing)
-   Sweetalert2 (for pop-ups)
-   OMDB API (for movie and series data)

### What We learned

```html
<mat-tab-group>
    <mat-tab label="Sign In">
        <form [formGroup]="loginForm" (ngSubmit)="login()">
            <div>
                <mat-icon>mail</mat-icon>
                <input type="email" placeholder="Enter Email" formControlName="email">
                <div *ngIf="this.loginForm.get('email')?.invalid && loginClicked" class="input-error">
                    Invalid Input
                </div>
            </div>
            <div>
                <mat-icon>lock</mat-icon>
                <input type="password" placeholder="Enter Password" formControlName="password">
                <div *ngIf="this.loginForm.get('password')?.invalid && loginClicked" class="input-error">
                    Invalid Input
                </div>
            </div>
            <button type="submit">Sign In</button>
        </form>
    </mat-tab>
    <mat-tab label="Sign Up">
        <form [formGroup]="signupForm" (ngSubmit)="signup()">
            <div>
                <mat-icon>mail</mat-icon>
                <input type="email" placeholder="Enter your e-mail address" formControlName="email">
                <div *ngIf="this.signupForm.get('email')?.invalid && signUpClicked" class="input-error">
                    Invalid Input
                </div>
            </div>
            <div>
                <mat-icon>person</mat-icon>
                <input type="text" placeholder="Enter Username" formControlName="username">
                <div *ngIf="this.signupForm.get('username')?.invalid && signUpClicked" class="input-error">
                    Invalid Input
                </div>
            </div>
            <div>
                <mat-icon>lock</mat-icon>
                <input type="password" placeholder="Enter your password (minimum 6 characters)" formControlName="password">
                <div *ngIf="this.signupForm.get('password')?.invalid && signUpClicked" class="input-error">
                    Invalid Input
                </div>
            </div>
            <div>
                <mat-icon>lock_person</mat-icon>
                <input type="password" placeholder="Re-enter your password" formControlName="re_password">
                <div *ngIf="this.signupForm.get('re_password')?.invalid && signUpClicked" class="input-error">
                    Invalid Input
                </div>
            </div>
            <button type="submit">Sign Up</button>
        </form>
    </mat-tab>
</mat-tab-group>
```

```java
public String searchMovieByImdbID(String imdbID) {
    if(!cache.containsKey(imdbID))
        cache.put(imdbID, movieActualService.searchMovieByImdbID(imdbID));
    String ans = cache.get(imdbID);
    checkAndClearCache();
    return ans;
}
```

### Useful resources

-   [AngularJS Docs](https://angular.io/docs)
-   [Sweetalert2](https://sweetalert2.github.io/)
-   [Java Spring Boot Documentation](https://spring.io/projects/spring-boot)
-   [MongoDB Documentation](https://www.mongodb.com/docs/)
-   [OMDB API Documentation](https://www.omdbapi.com/)
-   [Material Icons](https://developers.google.com/fonts/docs/material_icons)

### How To Use

To use CineWave, follow these steps:
-   Download the repository as a zip folder.
-   Install the required front-end dependencies by running the following terminal command `npm install`.
-   Put your OMDB API key in a file `APIKEY.txt` in the following path `CineWave\CineWave_Backend\src\main\java\com\cinewave\movieapi`.
-   Connect to the user database in `CineWave\CineWave_Backend\src\main\resources\application.properties`.
-   Open Project Structure and import JARs file from `CineWave\CineWave_Backend\JARs\json-20230618.jar`.
-   Run the back-end server on your device by running `CineWave\CineWave_Backend\src\main\java\com\cinewave\core\UserController.java`.
-   Run the front-end server on your device by running this terminal command `ng serve` at this path `CineWave\CineWave_Frontend`.
-   Open your browser and go to `localhost:4200/`.
-   Enjoy the cinematic experience!

## Authors

CineWave was created by:
-   Github Account: [George Samy](https://github.com/GeorgeBeshay)
-   Github Account: [Mariam Aziz](https://github.com/MariamAziz0)
-   Github Account: [Philopater Hany](https://github.com/PhilopaterHany)
