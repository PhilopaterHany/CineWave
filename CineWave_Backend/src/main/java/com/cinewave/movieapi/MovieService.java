package com.cinewave.movieapi;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

public class MovieService implements MovieServiceProvider {

    public final String SEARCH_URL = "http://www.omdbapi.com/?s=TITLE&apikey=APIKEY";
    public final String SEARCH_URL_IMDBID = "http://www.omdbapi.com/?i=IMDBID&apikey=APIKEY";
    public String API_KEY;

    public MovieService(){
        try {
            API_KEY = (new Scanner(new File("src/main/java/com/cinewave/movieapi/APIKEY.txt"))).nextLine();
            System.out.println("API-KEY was read successfully.");
        } catch (FileNotFoundException e) {
            System.out.println("APIKEY.txt File was not found, create it under the 'core' package, inserting in it your OMDb APIKEY.txt.");
            System.exit(0);
        }
    }

    public String sendGetRequests(String requestUrl){
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

    @Override
    public String searchMovieByTitle(String title){
        // list of movies
        String requestUrl = SEARCH_URL.replaceAll("TITLE", title).replaceAll("APIKEY", API_KEY);
        return sendGetRequests(requestUrl);
    }

    @Override
    public String searchMovieByImdbID(String imdbID){
        String requestUrl = SEARCH_URL_IMDBID.replaceAll("IMDBID", imdbID).replaceAll("APIKEY", API_KEY);
        return sendGetRequests(requestUrl);
    }
}
