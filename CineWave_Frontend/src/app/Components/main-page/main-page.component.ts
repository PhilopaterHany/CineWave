import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { MovieDataService } from "../../Services/movie-data.service";
import { UtilitiesService } from 'src/app/Services/utilities.service';
import { HttpClient } from '@angular/common/http';
import { ServerCallerService } from 'src/app/Services/server-caller.service';
import { User } from 'src/app/Interfaces/user';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {

  protected moviesDisplayed_IDs: Array<String> | undefined;
  protected moviesDisplayed_Metadata: Array<Object> | null = [];
  protected default_moviesDisplayed_IDs: Array<String> | undefined;
  protected loadingMoviesMetaData: Boolean = false;
  protected isSearching: Boolean = false;
  protected readonly Object = Object;

  async initDefaultMovies(){
    if (this.default_moviesDisplayed_IDs) {
      const promises = this.default_moviesDisplayed_IDs.map(async (imdbID) => {
        let movieData = await this.serverCaller.fetchMovie(imdbID);
        if(movieData != null)
          this.moviesDisplayed_Metadata?.push(movieData);
      });

      await Promise.all(promises);
    }
  }

  async ngOnInit(): Promise<void> {
    this.loadingMoviesMetaData = true;
    await this.initDefaultMovies();
    this.loadingMoviesMetaData = false;
    console.log('Current User: ', this.utilitiesService.getCurrentUser());
  }

  constructor(
    private router: Router,
    private movieDataService: MovieDataService,
    public utilitiesService: UtilitiesService,
    private serverCaller: ServerCallerService
    ) {
      this.default_moviesDisplayed_IDs = [
        'tt5071412',
        'tt0816692',
        'tt0468569',
        'tt0111161',
        'tt3032476',
        'tt15398776',
        'tt0903747',
        'tt0944947',
      ];
    }

  async search() {
    this.loadingMoviesMetaData = true;
    this.isSearching = true;
    let title = (document.getElementById("search-input") as HTMLInputElement).value;
    if(title == "") return;
    this.moviesDisplayed_Metadata = await this.serverCaller.searchMovie(title);
    if (this.moviesDisplayed_Metadata) {
      this.loadingMoviesMetaData = false;
      this.isSearching = false;
    }
  }

  addMovieToFavs(event: Event) {
    event.stopPropagation();
    console.log('Adding movie to favs.');
  }

  addMovieToWatched(event: Event) {
    event.stopPropagation();
    console.log('Adding movie to watched.');
  }

  openMovie(movieObj: Object) {
    console.log(movieObj);
    this.movieDataService.setMovieMetaData(movieObj);
    this.router.navigate(['/movie']);
  }
}
