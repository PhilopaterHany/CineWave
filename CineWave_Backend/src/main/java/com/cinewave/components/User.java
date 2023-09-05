package com.cinewave.components;

import java.util.*;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Users")
public class User {
    @Id
    private String _id;
    private String name;
    private String password;

    private List<String> favourites = new ArrayList<>();
    private List<String> watched = new ArrayList<>();

    public User(){
    }
    public User(String name, String password, String id) {
        this.name = name;
        this.password = password;
        this._id = id;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public String get_id() {
        return _id;
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

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", _id='" + _id + '\'' +
                ", favourites=" + favourites +
                ", watched=" + watched +
                '}';
    }
}
