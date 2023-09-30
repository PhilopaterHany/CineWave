<h1 align="center">
    CineWave
    <br />
    <br />
    Riding The Sine Waves Of Cinematic Brilliance
</h1>

![Preview](./design/desktop-preview.jpg)

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [Our Approach](#our-approach)
  - [Technologies Used](#technologies-used)
  - [What We Learned](#what-we-learned)
  - [Useful Resources](#useful-resources)
  - [How To Use](#how-to-use)
- [Meet The Team](#meet-the-team)

## Overview

CineWave is a sophisticated web application developed using Angular and Java Spring Boot, designed to provide users with an immersive cinematic experience. It offers features such as user registration, login, movie and series search, as well as the ability to manage watched and favorite lists. CineWave seamlessly integrates with the OMDB API for movie and series data retrieval and employs MongoDB for robust user database management.

Please note that certain movies may not display as expected due to data shortage from the API, but stay assured that we are actively working to enhance this feature.

### The challenge

CineWave is designed to empower users to:

- Register and securely log in to their accounts.
- Delete their accounts permanently and hassle-free.
- Effortlessly search for any movie or show, access detailed information, and explore a vast cinematic library.
- Curate and maintain personalized watched and favorites lists.
- Add movies or series to their favorites list.
- Access and explore their watched and favorites pages with ease.
- Search

### Links

- LinkedIn Post with Demo Video: [View Post]()

## Our Approach

### Technologies Used

CineWave is meticulously crafted using the following technologies:

- Semantic HTML5 Markup
- CSS Custom Properties
- AngularJS
- TypeScript
- Java Spring Boot
- MongoDB
- Postman API (for testing)
- Sweetalert2 (for pop-ups)
- OMDB API (for movie and series data)

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
    if (!cache.containsKey(imdbID))
        cache.put(imdbID, movieActualService.searchMovieByImdbID(imdbID));
    String ans = cache.get(imdbID);
    checkAndClearCache();
    return ans;
}
```

### Useful Resources

- [AngularJS Docs](https://angular.io/docs)
- [Sweetalert2](https://sweetalert2.github.io/)
- [Java Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [OMDB API Documentation](https://www.omdbapi.com/)
- [Material Icons](https://developers.google.com/fonts/docs/material_icons)

### How To Use

To enjoy CineWave's cinematic offerings, follow these simple steps:

- Download the repository as a zip folder.
- Install the necessary front-end dependencies by running `npm install` in your terminal.
- Write your OMDB API key in a file `APIKEY.txt` in the following path `CineWave\CineWave_Backend\src\main\java\com\cinewave\movieapi`.
- Establish a connection to the user database in `CineWave\CineWave_Backend\src\main\resources\application.properties`.
- In Project Structure, import JAR files from `CineWave\CineWave_Backend\JARs\json-20230618.jar`.
- Launch the back-end server on your device by running `CineWave\CineWave_Backend\src\main\java\com\cinewave\core\UserController.java`.
- Launch the front-end server by executing `ng serve`  from the `CineWave\CineWave_Frontend` directory in your terminal.
- Open your web browser and navigate to `localhost:4200/`.
- Immerse yourself in the cinematic world of CineWave!

## Meet The Team

CineWave is the creation of a dedicated team of developers:

- Github Account: [George Samy](https://github.com/GeorgeBeshay)
- Github Account: [Mariam Aziz](https://github.com/MariamAziz0)
- Github Account: [Philopater Hany](https://github.com/PhilopaterHany)

---

CineWave is more than just a web application; it's a gateway to a world of cinematic wonder. We're thrilled to bring you this immersive experience, where you can discover your favorite movies and shows like never before. As we continue to evolve and enhance CineWave, we invite you to join us on this cinematic journey.

Thank you for choosing CineWave, and here's to a future filled with even more cinematic brilliance! 🍿🎥🎉

Lights, camera, action! 🎥

For inquiries or collaboration opportunities, feel free to reach out to any team member.