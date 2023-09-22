import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieDataService {

  private movieMetaData: object | undefined;

  constructor() { }

  setMovieMetaData(movieMetaData: object){
    this.movieMetaData = movieMetaData;
  }

  getMovieMetaData(){
    return this.movieMetaData;
  }
}
