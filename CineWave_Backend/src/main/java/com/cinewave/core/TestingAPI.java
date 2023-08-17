package com.cinewave.core;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import org.json.*;
import java.io.File;  // Import the File class
import java.io.FileNotFoundException;  // Import this class to handle errors
import java.util.Scanner; // Import the Scanner class to read text files

public class TestingAPI {

    public static final String SEARCH_URL = "http://www.omdbapi.com/?s=TITLE&apikey=APIKEY";
    public static final String SEARCH_URL_IMDBID = "http://www.omdbapi.com/?i=IMDBID&apikey=APIKEY";

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

    public static void main(String[] args) {
        String API_KEY = null;
        try {
            API_KEY = (new Scanner(new File("src/main/java/com/cinewave/core/APIKEY.txt"))).nextLine();
        } catch (FileNotFoundException e) {
            System.out.println("APIKEY.txt File was not found, create it under the 'core' package, inserting in it your OMDb APIKEY.txt.");
            System.exit(0);
        }
        String jsonResponse = TestingAPI.searchMovieByTitle("inception", API_KEY);
        System.out.println(jsonResponse);  // normal JSON string
        System.out.println("--------------------- Separator ---------------------");

        JSONObject jsonObject = new JSONObject(jsonResponse);
        System.out.println(jsonObject.toString(3));     // JSON Object returned
        System.out.println("--------------------- Separator ---------------------");

        JSONArray jsonArray = new JSONArray(jsonObject.getJSONArray("Search"));         // array of the returned movies
        System.out.println(jsonArray.toString(3));
        System.out.println("--------------------- Separator ---------------------");

        JSONObject jsonObject1 = new JSONObject(TestingAPI.searchMovieByImdbID("tt1375666", API_KEY));
        System.out.println(jsonObject1.toString(3));
        System.out.println("--------------------- Separator ---------------------");
    }
}