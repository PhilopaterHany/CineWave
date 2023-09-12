package com.cinewave.core;

import org.springframework.dao.DataIntegrityViolationException;
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
import java.util.Optional;

@ComponentScan(basePackages = {"com.cinewave.components", "com.cinewave.core"})
@SpringBootApplication
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/server/")
@RestController
@Service
@EnableMongoRepositories(basePackageClasses = UserRepository.class)
public class UserController {

	@Autowired
	private UserRepository userRepository;
	@PostMapping(value = {"addUser"})
	public ResponseEntity<User> addUser(@RequestBody User user) {
		if(validateNewUserId(user.get_id())) {
			try {
				userRepository.save(user);
				System.out.println("User Created Successfully.");
				return new ResponseEntity<>(user, HttpStatus.OK);
			} catch (DataIntegrityViolationException e){
				System.out.println("User Creation Failed, MongoDB validation error: " + e.getMessage());
				return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
			}
			catch (Exception e){
				System.out.println(e.getMessage());
				return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
			}
		} else {
			System.out.println("User Creation Failed, Id is already taken.");
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping(value = {"deleteUser"})
	public ResponseEntity<String> deleteUser(@RequestBody User user) {
		if(!validateNewUserId(user.get_id())) {
			userRepository.deleteById(user.get_id());
			System.out.println("User Has Been Deleted Successfully.");
			return new ResponseEntity<>("User deleted Successfully.", HttpStatus.OK);
		} else {
			System.out.println("User wasn't found, and so it was not deleted.");
			return new ResponseEntity<>("User was not found, and so it was not deleted.", HttpStatus.BAD_REQUEST);
		}
	}


	@PutMapping(value = {"addMovie/{addToFav}/{movieName}"})
	public ResponseEntity<String> addMovie(@PathVariable boolean addToFav, @PathVariable String movieName, @RequestBody User user) {
		Optional<User> tempUser = userRepository.findById(user.get_id());
		if(tempUser.isEmpty()){
			System.out.println("User does not exist on the system database.");
			return new ResponseEntity<>("User does not exist.", HttpStatus.BAD_REQUEST);
		}
		user = tempUser.get();
		if(addToFav) {
			if(user.addFavourites(movieName)) {	// if the movie is already there, it will return false.
				userRepository.save(user);
				System.out.println("Movie has been added to favourites list successfully.");
				return new ResponseEntity<>("Movie is added To Favourites", HttpStatus.OK);
			}
			else {
				System.out.println("Movie was already found in the favourites list.");
				return new ResponseEntity<>("Movie is already present.", HttpStatus.BAD_REQUEST);
			}
		}
		else {
			if(user.addWatched(movieName)) {
				userRepository.save(user);
				System.out.println("Movie has been added to watched list successfully.");
				return new ResponseEntity<>("Movie is added To Watched", HttpStatus.OK);
			}
			else {
				System.out.println("Movie was already found in the watched list.");
				return new ResponseEntity<>("Movie is already present.", HttpStatus.BAD_REQUEST);
			}
		}
	}

	public boolean validateNewUserId(String _id) {
		try {
			userRepository.findById(_id).get();
			return false;
		} catch(Exception E) {
			return true;
		}
	}

	public static void main(String[] args) {
		SpringApplication.run(UserController.class, args);
	}

}
