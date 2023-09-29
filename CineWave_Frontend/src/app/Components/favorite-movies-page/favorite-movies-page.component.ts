import {Component, OnInit} from '@angular/core';
import { UtilitiesService } from 'src/app/Services/utilities.service';
import {ServerCallerService} from "../../Services/server-caller.service";

@Component({
  selector: 'app-favorite-movies-page',
  templateUrl: './favorite-movies-page.component.html',
  styleUrls: ['./favorite-movies-page.component.css'],
})
export class FavoriteMoviesPageComponent implements OnInit{
  protected searchText: string = '';
  protected objectsArray: Array<Object> = [];
  protected readonly Object = Object;
  protected loadingMoviesMetaData: Boolean = false;

  constructor(public utilitiesService: UtilitiesService, private serverCaller: ServerCallerService) {}

  async ngOnInit(): Promise<void> {
    this.loadingMoviesMetaData = true;
    let tempObj = this.utilitiesService.getCurrentUser();
    this.objectsArray = [];
    if (tempObj) {
      const promises = Object.values(tempObj)[Object.keys(tempObj).indexOf("favourites")].map(async (imdbId: String) => {
        let movieObj = await this.serverCaller.fetchMovie(imdbId);
        if (movieObj) this.objectsArray.push(movieObj);
      });
      await Promise.all(promises);
    }
    this.loadingMoviesMetaData = false;
  }
  containsSearchText(name: string): boolean {
    return name.toLowerCase().includes(this.searchText.toLowerCase());
  }
  isMatching(movie: any): boolean {
    return movie.Title.toLowerCase().includes(this.searchText.toLowerCase());
  }
  isHidden(movie: any): boolean {
    return !this.isMatching(movie);
  }
  noMatchesFound(): boolean {
    return this.objectsArray.every((movie) => !this.isMatching(movie));
  }
  async processAndAddMovie(event: Event, movie: Object, toFromFavs: boolean){
    await this.utilitiesService.addMovieTo(event, movie, toFromFavs);
    await this.ngOnInit();
  }
}
