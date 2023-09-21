import { Component } from '@angular/core';
import {UtilitiesService} from "../../Services/utilities.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    protected utilities: UtilitiesService;
    constructor(private router: Router) {
      this.utilities = new UtilitiesService();
    }

    clickSignIn() {
      this.router.navigateByUrl('/registration');
    }
}
