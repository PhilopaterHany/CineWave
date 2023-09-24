import { Component } from '@angular/core';
import { UtilitiesService } from 'src/app/Services/utilities.service';

@Component({
  selector: 'app-favorite-movies-page',
  templateUrl: './favorite-movies-page.component.html',
  styleUrls: ['./favorite-movies-page.component.css']
})
export class FavoriteMoviesPageComponent {

  constructor(private utilitiesService: UtilitiesService){
    // to use the currentUser object -> this.utilitiesService.getCurrentUser()
  }

}
