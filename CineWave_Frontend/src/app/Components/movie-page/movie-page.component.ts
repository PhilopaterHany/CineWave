import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDataService } from '../../Services/movie-data.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css'],
})
export class MoviePageComponent implements OnInit {
  movieMetadata: any;
  genreList: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieDataService: MovieDataService
  ) {}

  ngOnInit() {
    this.movieMetadata = this.movieDataService.getMovieMetaData();

    if (!this.movieMetadata) {
      const sessionStorageData = sessionStorage.getItem('movie-data');
      if (sessionStorageData) {
        this.movieMetadata = JSON.parse(sessionStorageData);
      }
    }

    if (!sessionStorage.getItem('movie-data')) {
      sessionStorage.setItem('movie-data', JSON.stringify(this.movieMetadata));
    }

    if (this.movieMetadata && this.movieMetadata.Runtime) {
      const runtimeMinutes = parseInt(this.movieMetadata.Runtime);
      const hours = Math.floor(runtimeMinutes / 60);
      const minutes = runtimeMinutes % 60;
      this.movieMetadata.FormattedRuntime = `${hours}h ${minutes}min`;
    }

    if (this.movieMetadata && this.movieMetadata.imdbVotes) {
      const votes = parseInt(this.movieMetadata.imdbVotes.replaceAll(",", ""));
      if (votes >= 1000000) {
        this.movieMetadata.FormattedVotes = `${(votes / 1000000).toFixed(1)}M`;
      } else if (votes >= 1000) {
        this.movieMetadata.FormattedVotes = `${(votes / 1000).toFixed(1)}K`;
      } else {
        this.movieMetadata.FormattedVotes = votes;
      }
    }

    if (this.movieMetadata && this.movieMetadata.Genre) {
      this.genreList = this.movieMetadata.Genre.split(', ');
    }
  }
}
