import { Injectable } from '@angular/core';
import {User} from "../Interfaces/user";
import {ServerCallerService} from "./server-caller.service";
import {Router} from "@angular/router";
import {MovieDataService} from "./movie-data.service";
import Swal from "sweetalert2";

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
    if (!genres) return '';
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
    if (!this.getCurrentUser()) {
      Swal.fire({
        title: 'You Must Sign in',
        text: 'You must sign in to do this action!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#009688',
        cancelButtonText: 'OK',
        confirmButtonText: 'Go to sign in page',
      }).then((result) => {
        if (result.isConfirmed) this.router.navigateByUrl('/registration');
      });
      return;
    }

    const favBtn = event.target as HTMLElement;
    let movieDiv = favBtn?.parentElement?.parentElement?.parentElement;
    if(movieDiv && movieDiv.title != 'movieDiv')
      movieDiv = movieDiv?.parentElement;
    console.log(movieDiv?.title);
    const buttonName = (toFromFavs) ? 'fav' : 'watched';

    let response;
    if (movieDiv?.classList.toggle(buttonName))
      response = await this.serverCaller.addMovie(<User>this.getCurrentUser(), Number(toFromFavs), Object.values(movie)[Object.keys(movie).indexOf("imdbID")]);
    else
      response = await this.serverCaller.removeMovie(<User>this.getCurrentUser(), Number(toFromFavs), Object.values(movie)[Object.keys(movie).indexOf("imdbID")]);

    if (response)
      this.setCurrentUser(response);
  }

  async addMovieTo_(event: Event, movie: Object, toFromFavs: boolean) {
    event.stopPropagation();
    if(!this.getCurrentUser()){
      Swal.fire({
        title: 'You Must Sign in',
        text: 'You must sign in to do this action!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#009688',
        cancelButtonText: 'OK',
        confirmButtonText: 'Go to sign in page',
      }).then((result) => {
        if (result.isConfirmed) this.router.navigateByUrl('/registration');
      });
      return;
    }

    const favBtn = event.target as HTMLElement;
    const movieDiv = (favBtn.title == '') ? favBtn?.parentElement : favBtn;
    const buttonName = (toFromFavs) ? 'favorite' : 'watched';

    let response;
    if (movieDiv?.classList.toggle(buttonName))
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

  isInFavOrWatched(movieObj: Object, inFavs: Boolean){
    const tempUser = this.getCurrentUser();
    if (tempUser) {
      const movies: Array<String> = Object.values(tempUser)[Object.keys(tempUser).indexOf(inFavs ? "favourites" : "watched")];
      if (movies.includes(Object.values(movieObj)[Object.keys(movieObj).indexOf("imdbID")])) return true;
    }
    return false;
  }
}
