import { Component } from '@angular/core';
import { UtilitiesService } from "../../Services/utilities.service";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import {User} from "../../Interfaces/user";
import {ServerCallerService} from "../../Services/server-caller.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    protected username: String | undefined;
    constructor(private router: Router,
                public utilitiesService: UtilitiesService,
                private serverCaller: ServerCallerService) {
      let tempUser = utilitiesService.getCurrentUser();
      if(tempUser) this.username = Object.values(tempUser)[Object.keys(tempUser).indexOf("username")];
    }

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
      this.router.navigate(['/favorites']);
    }

    navToWatched(){
      this.router.navigate(['/watched']);
    }

    logOut() {
      this.utilitiesService.setCurrentUser(undefined);
      console.log("Logging Out...");
      this.router.navigate(['/']);
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
      }).then(async (result) => {
        if (result.isConfirmed) {
          const deletionResult = await this.serverCaller.removeUser(<User>this.utilitiesService.getCurrentUser());
          if(deletionResult) {
            this.utilitiesService.setCurrentUser(undefined);
            await Swal.fire('Deleted!', Object.values(deletionResult)[0], 'success');
            await this.router.navigate(['/']);
          } else {
            await Swal.fire('Error!', "User account wasn't found", 'question');
          }
        }
      });
    }
}
