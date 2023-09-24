import { Component } from '@angular/core';
import { UtilitiesService } from 'src/app/Services/utilities.service';

@Component({
  selector: 'app-watched-movies-page',
  templateUrl: './watched-movies-page.component.html',
  styleUrls: ['./watched-movies-page.component.css']
})
export class WatchedMoviesPageComponent {

  constructor(private utilitiesService: UtilitiesService){
    console.log(this.utilitiesService.getCurrentUser());
  }

}
