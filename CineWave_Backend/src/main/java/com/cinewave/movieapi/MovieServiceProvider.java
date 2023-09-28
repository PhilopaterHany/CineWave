package com.cinewave.movieapi;

public interface MovieServiceProvider {
    String searchMovieByTitle(String title);
    String searchMovieByImdbID(String imdbID);

}
