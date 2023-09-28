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
		if(validateNewUserEmail(user.getEmail())) {
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
			System.out.println("User Creation Failed, email is already taken.");
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping(value = {"deleteUser"})
	public ResponseEntity<String> deleteUser(@RequestBody User user) {
		if(!validateNewUserEmail(user.getEmail())) {
			userRepository.deleteById(user.getEmail());
			System.out.println("User has been deleted successfully.");
			return new ResponseEntity<>("User has been deleted successfully.", HttpStatus.OK);
		} else {
			System.out.println("User wasn't found, and so it was not deleted.");
			return new ResponseEntity<>("User was not found, and so it was not deleted.", HttpStatus.BAD_REQUEST);
		}
	}


	@PutMapping(value = {"addMovie/{addToFav}/{movieIMDB}"})
	public ResponseEntity<User> addMovie(@PathVariable boolean addToFav, @PathVariable String movieIMDB, @RequestBody User user) {
		Optional<User> tempUser = userRepository.findById(user.getEmail());
		if(tempUser.isEmpty()){
			System.out.println("User does not exist on the system database.");
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
		user = tempUser.get();
		if(addToFav) {
			if(user.addFavourites(movieIMDB)) {	// if the movie is already there, it will return false.
				userRepository.save(user);
				System.out.println("Movie has been added to favourites list successfully.");
				return new ResponseEntity<>(user, HttpStatus.OK);
			}
			else {
				System.out.println("Movie was already found in the favourites list.");
				return new ResponseEntity<>(user, HttpStatus.BAD_REQUEST);
			}
		}
		else {
			if(user.addWatched(movieIMDB)) {
				userRepository.save(user);
				System.out.println("Movie has been added to watched list successfully.");
				return new ResponseEntity<>(user, HttpStatus.OK);
			}
			else {
				System.out.println("Movie was already found in the watched list.");
				return new ResponseEntity<>(user, HttpStatus.BAD_REQUEST);
			}
		}
	}

	@PutMapping(value = {"removeMovie/{removeFromFav}/{movieIMDB}"})
	public ResponseEntity<User> removeMovie(@PathVariable boolean removeFromFav, @PathVariable String movieIMDB, @RequestBody User user){
		Optional<User> tempUser = userRepository.findById(user.getEmail());
		if(tempUser.isEmpty()){
			System.out.println("User does not exist on the system database.");
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
		user = tempUser.get();
		if(removeFromFav) {
			if(user.removeFavourites(movieIMDB)) {	// if the movie is already there, it will return false.
				userRepository.save(user);
				System.out.println("Movie has been removed from favourites list successfully.");
				return new ResponseEntity<>(user, HttpStatus.OK);
			}
			else {
				System.out.println("Movie was not found in the favourites list.");
				return new ResponseEntity<>(user, HttpStatus.BAD_REQUEST);
			}
		} else {
			if(user.removeWatched(movieIMDB)) {
				userRepository.save(user);
				System.out.println("Movie has been removed from watched list successfully.");
				return new ResponseEntity<>(user, HttpStatus.OK);
			}
			else {
				System.out.println("Movie was not found in the watched list.");
				return new ResponseEntity<>(user, HttpStatus.BAD_REQUEST);
			}
		}
	}

	@PostMapping(value = {"signIn"})
	public ResponseEntity<User> signIn(@RequestBody User user) {
		Optional<User> temp = userRepository.findById(user.getEmail());
		if(temp.isEmpty()){
			System.out.println("User does not exist on the system database.");
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
		User tempUser = temp.get();
		if(!tempUser.getPassword().equals(user.getPassword())) {
			System.out.println("The password is not correct");
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
		System.out.println("Signing in Successfully.");
		return new ResponseEntity<>(tempUser, HttpStatus.OK);
	}

	public boolean validateNewUserEmail(String email) {
		try {
			userRepository.findById(email).get();
			return false;
		} catch(Exception E) {
			return true;
		}
	}

	public static void main(String[] args) {
		SpringApplication.run(UserController.class, args);
	}

}
