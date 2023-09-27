import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return await firstValueFrom(
      this.http.post<User>(this.url + 'addUser', newUser)   // returns user.
    );
  }

  // Remove registered user from the DB.
  async removeUser(user: User){
    return await firstValueFrom(
      this.http.post<String>(this.url + 'deleteUser', user)       // returns string
    );
  }

  // Sign In Request (either the full user data will return or not, in case of unsuccessful authentication )
  async signIn(user: User){
    return await firstValueFrom(
      this.http.post<User>(this.url + 'signIn', user)   // returns the user object.
    );
  }

  // To add a movie to the user favorite / watched list.
  async addMovie(user: User, toFav: Number, movieImdbId: String){
    return await firstValueFrom(
      this.http.put<String>(this.url + `addMovie/${toFav}/${movieImdbId}`, user)   // returns string (should be changed.)
    );
  }

  // To remove a movie from the user favorite / watched list.
  async removeMovie(user: User, fromFav: Number, movieImdbId: String){
    return await firstValueFrom(
      this.http.put<String>(this.url + `removeMovie/${fromFav}/${movieImdbId}`, user)   // returns string (should be changed.)
    );
  }

  // To get the metadata of a movie
  async fetchMovie(movieImdbId: String){
    return await firstValueFrom(
      this.http.get<Object>(this.url + `fetchMovie/${movieImdbId}`)      // returns movie object
    );
  }

  // To search for movie, given its title
  async searchMovie(movieTitle: String){
    return await firstValueFrom(
      this.http.get<Array<Object>>(this.url + `searchMovie/${movieTitle}`)      // returns array of movie objects
    );
  }

}
