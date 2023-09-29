import { Component } from '@angular/core';
import { UtilitiesService } from 'src/app/Services/utilities.service';
import { ServerCallerService } from 'src/app/Services/server-caller.service';

@Component({
  selector: 'app-watched-movies-page',
  templateUrl: './watched-movies-page.component.html',
  styleUrls: ['./watched-movies-page.component.css'],
})
export class WatchedMoviesPageComponent {
  protected searchText: string = '';
  protected objectsArray: Array<Object> = [];
  protected readonly Object = Object;
  protected loadingMoviesMetaData: Boolean = true;
  constructor(public utilitiesService: UtilitiesService, private serverCaller: ServerCallerService) {}
  async ngOnInit(): Promise<void> {
    let tempObj = this.utilitiesService.getCurrentUser();
    this.objectsArray = [];
    this.loadingMoviesMetaData = true;
    if(tempObj) {
      const promises = Object.values(tempObj)[Object.keys(tempObj).indexOf("watched")].map(async (imdbId: String) => {
        let movieObj = await this.serverCaller.fetchMovie(imdbId);
        if (movieObj)
          this.objectsArray.push(movieObj);
      });
      await Promise.all(promises);
    }
    console.log(this.objectsArray);
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
