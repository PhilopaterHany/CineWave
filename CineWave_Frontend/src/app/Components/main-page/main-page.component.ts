import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  currentYear: any = new Date().getFullYear();
  constructor(private router: Router) {
  }

  openMovie() {
    let fakeObject = { title: 'film', rate: 8 }; // should be replaced with the real movie obj
    this.router.navigate(['/movie'], {
      queryParams: { movieObj: JSON.stringify(fakeObject) },
    });
  }
}
