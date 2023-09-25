import { Component } from '@angular/core';
import { UtilitiesService } from 'src/app/Services/utilities.service';

@Component({
  selector: 'app-watched-movies-page',
  templateUrl: './watched-movies-page.component.html',
  styleUrls: ['./watched-movies-page.component.css'],
})
export class WatchedMoviesPageComponent {
  constructor(private utilitiesService: UtilitiesService) {
    console.log(this.utilitiesService.getCurrentUser());
  }

  searchText: string = '';
  objectsArray = [
    {
      Title: 'Inception',
      Year: '2010',
      Rated: 'PG-13',
      Released: '16 Jul 2010',
      Runtime: '148 min',
      Genre: 'Action, Adventure, Sci-Fi',
      imdbRating: '8.8',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    },
    {
      Title: 'The Dark Knight',
      Year: '2008',
      Rated: 'PG-13',
      Released: '18 Jul 2008',
      Runtime: '152 min',
      Genre: 'Action, Crime, Drama',
      imdbRating: '9.0',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
    },
    {
      Title: 'Green Book',
      Year: '2018',
      Rated: 'PG-13',
      Released: '16 Nov 2018',
      Runtime: '130 min',
      Genre: 'Biography, Comedy, Drama',
      imdbRating: '8.2',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BYzIzYmJlYTYtNGNiYy00N2EwLTk4ZjItMGYyZTJiOTVkM2RlXkEyXkFqcGdeQXVyODY1NDk1NjE@._V1_SX300.jpg',
    },
    {
      Title: 'The Shawshank Redemption',
      Year: '1994',
      Rated: 'R',
      Released: '14 Oct 1994',
      Runtime: '142 min',
      Genre: 'Drama',
      imdbRating: '9.3',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg',
    },
    {
      Title: 'Oppenheimer',
      Year: '2023',
      Rated: 'R',
      Released: '21 Jul 2023',
      Runtime: '180 min',
      Genre: 'Biography, Drama, History',
      imdbRating: '8.6',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg',
    },
    {
      Title: 'Interstellar',
      Year: '2014',
      Rated: 'PG-13',
      Released: '07 Nov 2014',
      Runtime: '169 min',
      Genre: 'Adventure, Drama, Sci-Fi',
      imdbRating: '8.7',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    },
  ];
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
}
