import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MovieDataService } from "../../Services/movie-data.service";
import { UtilitiesService } from 'src/app/Services/utilities.service';
import { ServerCallerService } from 'src/app/Services/server-caller.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  protected moviesDisplayed_Metadata: Array<Object> | null = [];
  protected bannerData: any | null = null;
  protected default_moviesDisplayed_IDs: Array<String> | undefined;
  protected default_banner_ID: string = 'tt0468569';
  protected loadingMoviesMetaData: Boolean = false;
  protected readonly Object = Object;

  async ngOnInit(): Promise<void> {
    this.loadingMoviesMetaData = true;
    await this.fetchDefaultBannerMovie();
    await this.initDefaultMovies();
    this.loadingMoviesMetaData = false;
  }

  constructor(
    private router: Router,
    private movieDataService: MovieDataService,
    public utilitiesService: UtilitiesService,
    private serverCaller: ServerCallerService
  ) {
    this.default_moviesDisplayed_IDs = ['tt5071412', 'tt0816692', 'tt0468569', 'tt0111161', 'tt3032476', 'tt15398776', 'tt0903747', 'tt0944947'];
  }

  async search() {
    this.loadingMoviesMetaData = true;
    let title = (document.getElementById('search-input') as HTMLInputElement).value;
    if (title == '') return;
    this.moviesDisplayed_Metadata = await this.serverCaller.searchMovie(title);
    if (this.moviesDisplayed_Metadata) this.loadingMoviesMetaData = false;
  }

  async fetchDefaultBannerMovie() {
    if (this.default_banner_ID) {
      const movieData = await this.serverCaller.fetchMovie(this.default_banner_ID);
      if (movieData != null) this.bannerData = movieData;
    }
  }

  async initDefaultMovies() {
    if (this.default_moviesDisplayed_IDs) {
      const promises = this.default_moviesDisplayed_IDs.map(async (imdbID) => {
        let movieData = await this.serverCaller.fetchMovie(imdbID);
        if (movieData != null) this.moviesDisplayed_Metadata?.push(movieData);
      });

      await Promise.all(promises);
    }
  }
}
