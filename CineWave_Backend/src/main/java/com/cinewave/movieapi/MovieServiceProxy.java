package com.cinewave.movieapi;

import java.util.HashMap;
import java.util.Map;

public class MovieServiceProxy implements MovieServiceProvider {

    private final Map<String, String> cache;
    private final MovieServiceProvider movieActualService;
    public MovieServiceProxy(){
        this.cache = new HashMap<>();
        this.movieActualService = new MovieService();
    }

    @Override
    public String searchMovieByTitle(String title) {
        if(!cache.containsKey(title))
            cache.put(title, movieActualService.searchMovieByTitle(title));
        String ans =  cache.get(title);
        checkAndClearCache();
        return ans;
    }

    @Override
    public String searchMovieByImdbID(String imdbID) {
        if(!cache.containsKey(imdbID))
            cache.put(imdbID, movieActualService.searchMovieByImdbID(imdbID));
        String ans = cache.get(imdbID);
        checkAndClearCache();
        return ans;
    }

    private void checkAndClearCache(){
        if(cache.size() > 100)
            cache.clear();
    }
}
