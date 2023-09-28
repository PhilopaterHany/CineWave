package com.cinewave.core;

import com.cinewave.movieapi.MovieServiceProvider;
import com.cinewave.movieapi.MovieServiceProxy;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@ComponentScan(basePackages = {"com.cinewave.components", "com.cinewave.core"})
@SpringBootApplication
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/server/")
@RestController
@Service
public class MovieController {

    // To Be Implemented.
    @GetMapping(value = {"fetchMovie/{imdbID}"})
    public ResponseEntity<Map<String, Object>> fetchMovie(@PathVariable String imdbID){
        // Using the imdbID fetch the movie metadata and return the JSON Object
        // In case of false imdbID, return a representative ResponseEntity of this case.
        JSONObject results = new JSONObject(movieServiceProvider.searchMovieByImdbID(imdbID));
        if(results.get("Response").toString().compareToIgnoreCase("false") == 0){
            System.out.println("Movie was not found ..");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        System.out.println("Movie was found Successfully ..");
        return new ResponseEntity<>(results.toMap(), HttpStatus.OK);
    }

    @GetMapping(value = {"searchMovie/{title}"})
    public ResponseEntity<List<Object>> searchMovie(@PathVariable String title){
        JSONObject results = new JSONObject(movieServiceProvider.searchMovieByTitle(title));
        if(results.get("Response").toString().compareToIgnoreCase("false") == 0){
            System.out.println("Movie searching for was not found ..");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        JSONArray jsonArray = new JSONArray(results.getJSONArray("Search"));         // array of the returned movies
        ArrayList<Object> detailedResults = new ArrayList<>();
        for(int i = 0 ; i < jsonArray.length() ; i++)
            detailedResults.add((new JSONObject(movieServiceProvider.searchMovieByImdbID(((JSONObject)jsonArray.get(i)).get("imdbID").toString()))).toMap());
        return new ResponseEntity<>(detailedResults, HttpStatus.OK);
    }
    private static MovieServiceProvider movieServiceProvider;

    public MovieController(){
        movieServiceProvider = new MovieServiceProxy();
    }

}
