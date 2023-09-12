package com.cinewave.core;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

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
        return null;
    }

    @GetMapping(value = {"searchMovie/{title}"})
    public ResponseEntity<List<Object>> searchMovie(@PathVariable String title){
        JSONObject results = new JSONObject(searchMovieByTitle(title, API_KEY));
        if(results.get("Response") == "False"){
            System.out.println("Movie searching for was not found ..");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        JSONArray jsonArray = new JSONArray(results.getJSONArray("Search"));         // array of the returned movies
//        System.out.println(jsonArray.toString(3));
        return new ResponseEntity<>(jsonArray.toList(), HttpStatus.OK);
    }


    public static final String SEARCH_URL = "http://www.omdbapi.com/?s=TITLE&apikey=APIKEY";
    public static final String SEARCH_URL_IMDBID = "http://www.omdbapi.com/?i=IMDBID&apikey=APIKEY";
    public static String API_KEY;

    public MovieController(){
        try {
            API_KEY = (new Scanner(new File("src/main/java/com/cinewave/core/APIKEY.txt"))).nextLine();
            System.out.println("API-KEY was read successfully.");
        } catch (FileNotFoundException e) {
            System.out.println("APIKEY.txt File was not found, create it under the 'core' package, inserting in it your OMDb APIKEY.txt.");
            System.exit(0);
        }
    }
    public static String sendGetRequests(String requestUrl){
        StringBuffer response = new StringBuffer();
        try {
            URL url = new URL(requestUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Accept", "*/*");
            connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
            InputStream stream = connection.getInputStream();
            InputStreamReader reader = new InputStreamReader(stream);
            BufferedReader buffer = new BufferedReader(reader);
            String line;
            while((line = buffer.readLine()) != null)
                response.append(line);
            buffer.close();
            connection.disconnect();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return response.toString();
    }

    public static String searchMovieByTitle(String title, String key){
        // list of movies
        String requestUrl = SEARCH_URL.replaceAll("TITLE", title).replaceAll("APIKEY", key);
        return sendGetRequests(requestUrl);
    }

    public static String searchMovieByImdbID(String imdbID, String key){
        String requestUrl = SEARCH_URL_IMDBID.replaceAll("IMDBID", imdbID).replaceAll("APIKEY", key);
        return sendGetRequests(requestUrl);
    }

}
