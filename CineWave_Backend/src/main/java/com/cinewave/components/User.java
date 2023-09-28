package com.cinewave.components;

import java.util.*;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Users")
public class User {
    @Id
    private String email;
    private String username;
    private String password;

    private List<String> favourites = new ArrayList<>();
    private List<String> watched = new ArrayList<>();

    public User(){
    }
    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public List<String> getFavourites() {
        return favourites;
    }

    public List<String> getWatched() {
        return watched;
    }

    public boolean addFavourites(String name) {
        if(favourites.contains(name))
            return false;
        favourites.add(name);
        return true;
    }

    public boolean addWatched(String name) {
        if(watched.contains(name))
            return false;
        watched.add(name);
        return true;
    }

    public boolean removeFavourites(String name) {
        if(!favourites.contains(name))
            return false;
        favourites.remove(name);
        return true;
    }

    public boolean removeWatched(String name) {
        if(!watched.contains(name))
            return false;
        watched.remove(name);
        return true;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + username + '\'' +
                ", password='" + password + '\'' +
                ", _id='" + email + '\'' +
                ", favourites=" + favourites +
                ", watched=" + watched +
                '}';
    }
}
