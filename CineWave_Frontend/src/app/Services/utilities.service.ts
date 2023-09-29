import { Injectable } from '@angular/core';
import {User} from "../Interfaces/user";
import {ServerCallerService} from "./server-caller.service";
import {Router} from "@angular/router";
import {MovieDataService} from "./movie-data.service";

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  /*
    This service provides the following:
      1- Utilities function that may be used by multiple components.
      2- Objects Passing Technique, to allow components communication.
  */

  // The user (currently logged in) object.
  private currentUser: object | undefined;

  constructor(private serverCaller: ServerCallerService,
              private router: Router,
              private movieDataService: MovieDataService) {}

  setCurrentUser(currentUser: object | undefined) {
    this.currentUser = currentUser;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  formatGenres(genres: string): string {
    const genreArray = genres.split(', ');
    if (genreArray.length === 1) {
      return genreArray[0];
    } else if (genreArray.length === 2) {
      return genreArray.join('/');
    } else {
      return `${genreArray[0]}/${genreArray[1]}`;
    }
  }

  async addMovieTo(event: Event, movie: Object, toFromFavs: boolean) {
    event.stopPropagation();
    if(!this.getCurrentUser()){
      // TODO
      // user is not logged in, display an error msg here using Swal and remove
      // the console.log()
      console.log("Sign in first ..") // remove this
      return;
    }

    const favBtn = event.target as HTMLElement;
    const movieDiv = favBtn?.parentElement?.parentElement?.parentElement?.parentElement;
    const buttonName = (toFromFavs) ? 'fav' : 'watched';
    let response;

    if(movieDiv?.classList.toggle(buttonName))
      response = await this.serverCaller.addMovie(<User>this.getCurrentUser(), Number(toFromFavs), Object.values(movie)[Object.keys(movie).indexOf("imdbID")]);
    else
      response = await this.serverCaller.removeMovie(<User>this.getCurrentUser(), Number(toFromFavs), Object.values(movie)[Object.keys(movie).indexOf("imdbID")]);

    if (response)
      this.setCurrentUser(response);
  }

  openMovie(movieObj: Object) {
    this.movieDataService.setMovieMetaData(movieObj);
    this.router.navigate(['/movie']);
  }
}
