import { Component } from '@angular/core';
import { UtilitiesService } from "../../Services/utilities.service";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    constructor(private router: Router, public utilitiesService: UtilitiesService) {}

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

    userActions() {
      const userActionsList = document.querySelector(
        'header .container .user ul'
      ) as HTMLElement;
      userActionsList.classList.toggle('show');
    }

    navToFavorites(){
      this.utilitiesService.setCurrentUser({'name': 'John Doe', 'age': 25});    // testing .. should be deteleted.
      this.router.navigate(['/favorites']);
    }

    navToWatched(){
      this.utilitiesService.setCurrentUser({'name': 'John Doe 2', 'age': 25});    // testing .. should be deteleted.
      this.router.navigate(['/watched']);
    }

    logOut() {
      console.log("Logging Out...");
    }

    deleteAccount() {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Deleted!', 'Your account has been deleted.', 'success');
          // Call the delete user function from backend here
        }
      });
    }
}
