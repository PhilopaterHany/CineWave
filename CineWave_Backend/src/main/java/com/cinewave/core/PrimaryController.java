package com.cinewave.core;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import com.cinewave.components.*;

@ComponentScan(basePackages = {"com.cinewave.components", "com.cinewave.core"})
@SpringBootApplication
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/server/")
@RestController
@Service
@EnableMongoRepositories(basePackageClasses = UserRepository.class)
public class PrimaryController {

	@Autowired
	private UserRepository userRepository;
	@PostMapping(value = {"addUser"})
	public ResponseEntity<String> addUser(@RequestBody User user) {
		if(validateUserId(user.get_id())) {
			userRepository.save(user);
			System.out.println("User Created Successfully.");
			return new ResponseEntity<>("User added Successfully.", HttpStatus.OK);
		} else {
			System.out.println("User Creation Failed, Id is already taken.");
			return new ResponseEntity<>("User is not added.", HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping(value = {"deleteUser"})
	public ResponseEntity<String> deleteUser(@RequestBody User user) {
		if(!validateUserId(user.get_id())) {
			userRepository.deleteById(user.get_id());
			System.out.println("User Has Been Deleted Successfully.");
			return new ResponseEntity<>("User deleted Successfully.", HttpStatus.OK);
		} else {
			System.out.println("User Couldn't Be Found.");
			return new ResponseEntity<>("User is not deleted.", HttpStatus.BAD_REQUEST);
		}
	}
	@PutMapping(value = {"addMovie/{addToFav}/{movieName}"})
	public ResponseEntity<String> addMovie(@PathVariable boolean addToFav, @PathVariable String movieName, @RequestBody User user) {
		if(addToFav) {
			if(user.addFavourites(movieName)) {
				userRepository.save(user);
				return new ResponseEntity<>("Movie is added To Favourites", HttpStatus.OK);
			}
			else
				return new ResponseEntity<>("Movie is already present.", HttpStatus.BAD_REQUEST);
		}
		else {
			if(user.addWatched(movieName)) {
				userRepository.save(user);
				return new ResponseEntity<>("Movie is added To Watched", HttpStatus.OK);
			}
			else
				return new ResponseEntity<>("Movie is already present.", HttpStatus.BAD_REQUEST);
		}
	}

	public boolean validateUserId(String _id) {
		try {
			userRepository.findById(_id).get();
			return false;
		} catch(Exception E) {
			return true;
		}
	}

	public static void main(String[] args) {
		SpringApplication.run(PrimaryController.class, args);
		System.out.println("Hello World!");
	}

}
