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
export class MainPageComponent implements OnInit{

  currentYear: any = new Date().getFullYear();
  protected moviesDisplayed_IDs: Array<String> | undefined;
  protected moviesDisplayed_Metadata: Array<Object> = [];
  protected default_moviesDisplayed_IDs: Array<String> | undefined;
  protected loadingMoviesMetaData: Boolean = false;

  protected tmp_movies = [
    {
        "Metascore": "74",
        "BoxOffice": "$292,587,330",
        "Website": "N/A",
        "imdbRating": "8.8",
        "imdbVotes": "2,462,841",
        "Ratings": [
            {
                "Value": "8.8/10",
                "Source": "Internet Movie Database"
            },
            {
                "Value": "87%",
                "Source": "Rotten Tomatoes"
            },
            {
                "Value": "74/100",
                "Source": "Metacritic"
            }
        ],
        "Runtime": "148 min",
        "Language": "English, Japanese, French",
        "Rated": "PG-13",
        "Production": "N/A",
        "Released": "16 Jul 2010",
        "imdbID": "tt1375666",
        "Plot": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
        "Director": "Christopher Nolan",
        "Title": "Inception",
        "Actors": "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
        "Response": "True",
        "Type": "movie",
        "Awards": "Won 4 Oscars. 159 wins & 220 nominations total",
        "DVD": "20 Jun 2013",
        "Year": "2010",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        "Country": "United States, United Kingdom",
        "Genre": "Action, Adventure, Sci-Fi",
        "Writer": "Christopher Nolan"
    },
    {
        "Metascore": "88",
        "BoxOffice": "$302,215,760",
        "Website": "N/A",
        "imdbRating": "8.6",
        "imdbVotes": "402,067",
        "Ratings": [
            {
                "Value": "8.6/10",
                "Source": "Internet Movie Database"
            },
            {
                "Value": "93%",
                "Source": "Rotten Tomatoes"
            },
            {
                "Value": "88/100",
                "Source": "Metacritic"
            }
        ],
        "Runtime": "180 min",
        "Language": "English, German, Italian",
        "Rated": "R",
        "Production": "N/A",
        "Released": "21 Jul 2023",
        "imdbID": "tt15398776",
        "Plot": "The story of American scientist, J. Robert Oppenheimer, and his role in the development of the atomic bomb.",
        "Director": "Christopher Nolan",
        "Title": "Oppenheimer",
        "Actors": "Cillian Murphy, Emily Blunt, Matt Damon",
        "Response": "True",
        "Type": "movie",
        "Awards": "2 wins & 1 nomination",
        "DVD": "N/A",
        "Year": "2023",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
        "Country": "United Stats, United Kingdom",
        "Genre": "Biography, Drama, History",
        "Writer": "Christopher Nolan, Kai Bird, Martin Sherwin"
    }];

  async ngOnInit(): Promise<void> {
    this.loadingMoviesMetaData = true;
    if (this.default_moviesDisplayed_IDs) {
      const promises = this.default_moviesDisplayed_IDs.map(async (imdbID) => {
        const metadata = await this.serverCaller.fetchMovie(imdbID);
        this.moviesDisplayed_Metadata?.push(metadata);
      });
  
      await Promise.all(promises);
    }
    this.loadingMoviesMetaData = false;
    
    // console.log(Object.keys(this.moviesDisplayed_Metadata[0]));
    // console.log((this.moviesDisplayed_Metadata[0])["Title" as keyof object]);
    // console.log((this.tmp_movies[0])["Title" as keyof object]);
  }
  
  constructor(
    private router: Router, 
    private movieDataService: MovieDataService, 
    private utilitiesService: UtilitiesService,
    private http: HttpClient,
    private serverCaller: ServerCallerService
    ) {
      this.default_moviesDisplayed_IDs = [
        'tt1160419',
        'tt0816692',
        'tt0468569',
        'tt1502397',
        'tt15398776',
      ];
    }

  async search(){
    console.log(this.moviesDisplayed_Metadata.length);
    // console.log(await this.serverCaller.fetchMovie('tt1375666'));
    // console.log(await this.serverCaller.searchMovie('Inception'));
    // console.log(await this.serverCaller.signUp(<User>{'email': 'g@mail.com', 'password': '123'}))
  }

  addMovieToFavs(event: Event){
    event.stopPropagation();
    console.log('Adding movie to favs.');
  }

  addMovieToWatched(event: Event){
    event.stopPropagation();
    console.log('Adding movie to watched.');
  }

  displayMovies(){
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

  openMovie() {
    this.movieDataService.setMovieMetaData({
      "Metascore": "74",
      "BoxOffice": "$292,587,330",
      "Website": "N/A",
      "imdbRating": "8.8",
      "imdbVotes": "2,462,841",
      "Ratings": [
        {
          "Value": "8.8/10",
          "Source": "Internet Movie Database"
        },
        {
          "Value": "87%",
          "Source": "Rotten Tomatoes"
        },
        {
          "Value": "74/100",
          "Source": "Metacritic"
        }
      ],
      "Runtime": "148 min",
      "Language": "English, Japanese, French",
      "Rated": "PG-13",
      "Production": "N/A",
      "Released": "16 Jul 2010",
      "imdbID": "tt1375666",
      "Plot": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
      "Director": "Christopher Nolan",
      "Title": "Inception",
      "Actors": "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
      "Response": "True",
      "Type": "movie",
      "Awards": "Won 4 Oscars. 159 wins & 220 nominations total",
      "DVD": "20 Jun 2013",
      "Year": "2010",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
      "Country": "United States, United Kingdom",
      "Genre": "Action, Adventure, Sci-Fi",
      "Writer": "Christopher Nolan"
    });
    this.router.navigate(['/movie']);
  }
}
