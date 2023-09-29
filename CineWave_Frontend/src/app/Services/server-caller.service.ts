import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { User } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ServerCallerService {

  private port = 8081;
  private url = `http://localhost:${this.port}/server/`;

  constructor(private http: HttpClient) { }

  // User creation (Sign Up)
  async signUp(newUser: User) {
    try {
      return await firstValueFrom(
        this.http.post<User>(this.url + 'addUser', newUser)   // returns user.
      );
    } catch (error) {
      if(error instanceof HttpErrorResponse)
        console.error('Bad request');
      else
        console.error('Error');
    }
    return null;
  }

  // Remove registered user from the DB.
  async removeUser(user: User){
    try {
      return await firstValueFrom(
        this.http.post<Object>(this.url + 'deleteUser', user)       // returns string
      );
    } catch (err) {
      if(err instanceof HttpErrorResponse)
        console.error('Bad request', err.error);
      else
        console.error('Error');
    }
    return null;
  }

  // Sign In Request (either the full user data will return or not, in case of unsuccessful authentication )
  async signIn(user: User){
    try {
      return await firstValueFrom(
        this.http.post<User>(this.url + 'signIn', user)   // returns the user object.
      );
    } catch (error) {
      if(error instanceof HttpErrorResponse)
        console.error('Bad request');
      else
        console.error('Error');
    }
    return null;
  }

  // To add a movie to the user favorite / watched list.
  async addMovie(user: User, toFav: Number, movieImdbId: String){
    try {
      return await firstValueFrom(
        this.http.put<User>(this.url + `addMovie/${toFav}/${movieImdbId}`, user)   // returns string (should be changed.)
      );
    } catch (err) {
      if(err instanceof HttpErrorResponse)
        console.error('Bad request');
      else
        console.error('Error');
    }
    return null;
  }

  // To remove a movie from the user favorite / watched list.
  async removeMovie(user: User, fromFav: Number, movieImdbId: String){
    try {
      return await firstValueFrom(
        this.http.put<String>(this.url + `removeMovie/${fromFav}/${movieImdbId}`, user)   // returns string (should be changed.)
      );
    } catch (error) {
      if(error instanceof HttpErrorResponse)
        console.error('Bad request');
      else
        console.error('Error');
    }
    return null;
  }

  // To get the metadata of a movie
  async fetchMovie(movieImdbId: String){
    try {
      return await firstValueFrom(
        this.http.get<Object>(this.url + `fetchMovie/${movieImdbId}`)      // returns movie object
      );
    } catch (error) {
      if(error instanceof HttpErrorResponse)
        console.error('Bad request');
      else
        console.error('Error');
    }
    return null;
  }

  // To search for movie, given its title
  async searchMovie(movieTitle: String){
    try {
      return await firstValueFrom(
        this.http.get<Array<Object>>(this.url + `searchMovie/${movieTitle}`)      // returns array of movie objects
      );
    } catch (error) {
      if(error instanceof HttpErrorResponse)
        console.error('Bad request');
      else
        console.error('Error');
    }
    return null;
  }

}
