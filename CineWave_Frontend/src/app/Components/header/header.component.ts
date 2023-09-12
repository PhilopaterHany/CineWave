import { Component } from '@angular/core';
import {UtilitiesService} from "../../Services/utilities.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    protected utilities: UtilitiesService;
    constructor() {
      this.utilities = new UtilitiesService();
    }
}
