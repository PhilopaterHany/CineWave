import { Component } from '@angular/core';
import {UtilitiesService} from "../../Services/utilities.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    constructor(private router: Router, private utilitiesService: UtilitiesService) {}

    clickSignIn() {
      this.router.navigateByUrl('/registration');
    }

    toggleNav() {
      const pageHeader = document.querySelector('header') as HTMLElement;
      const burgerMenu = document.querySelector('header .container .burger-menu') as HTMLElement;
      const navList = document.querySelector('header .container nav') as HTMLElement;
      pageHeader.classList.toggle('active');
      burgerMenu.classList.toggle('active');
      navList.classList.toggle('active');
    }

    navToFavorites(){
      this.utilitiesService.setCurrentUser({'name': 'John Doe', 'age': 25});    // testing .. should be deteleted.
      this.router.navigate(['/favorites']);
    }

    navToWatched(){
      this.utilitiesService.setCurrentUser({'name': 'John Doe 2', 'age': 25});    // testing .. should be deteleted.
      this.router.navigate(['/watched']);
    }
}
