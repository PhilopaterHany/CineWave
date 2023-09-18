import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent {

  movieMetadata: Object | undefined;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe((params) => {
      this.movieMetadata = JSON.parse(params['movieObj']);
    });
    console.log(this.movieMetadata);
  }

}
