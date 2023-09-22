import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MovieDataService} from "../../Services/movie-data.service";

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent {

  movieMetadata: Object | undefined;
  constructor(private route: ActivatedRoute, private router: Router, private movieDataService: MovieDataService) {
    console.log(this.movieDataService.getMovieMetaData());
  }

}
