import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {MovieDataService} from "../../Services/movie-data.service";
import { UtilitiesService } from 'src/app/Services/utilities.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  currentYear: any = new Date().getFullYear();
  constructor(private router: Router, private movieDataService: MovieDataService, private utilitiesService: UtilitiesService) {
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
