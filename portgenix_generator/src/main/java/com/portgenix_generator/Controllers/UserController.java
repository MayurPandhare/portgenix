package com.portgenix_generator.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.portgenix_generator.Entities.User;
import com.portgenix_generator.JwtAuthentication.JwtService;
import com.portgenix_generator.Repository.UploadPostRepository;
import com.portgenix_generator.Repository.UserRepository;
import com.portgenix_generator.Services.UserProfileService;

@RestController
@CrossOrigin(origins = "http://localhost:4500/") // Allow CORS for this specific method
@RequestMapping("/user")
public class UserController {
    

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UploadPostRepository uPostRepository;

    @Autowired
    private UserProfileService userProfileService;

    @PostMapping("/profile")
public ResponseEntity<?> getUserProfile() {
    // Get the username from the authentication context
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String username = authentication.getName();  // The username from JWT token

    // Log the username for debugging
    System.out.println("\n\nUsername-auth:" + username);

    if (username == null || username.isEmpty()) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized - No user found in the token");
    }

    // Fetch user profile data from the database
    User userProfile = userRepository.getUserByUserName(username);

    if (userProfile == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    // Return a limited view of the user profile
    User profile = new User();
    profile.setFirstname(userProfile.getFirstname());
    profile.setImageUrl(userProfile.getImageUrl());
    profile.setLocation(userProfile.getLocation());


    System.out.println("\n\nprofile: " + profile);
    // Return the user profile as response
    return ResponseEntity.ok().body(profile);
}


@PostMapping("/header")
public ResponseEntity<?> getUserheader() {
    // Get the username from the authentication context
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String username = authentication.getName();  // The username from JWT token

    // Log the username for debugging
    System.out.println("\n\nUsername-auth:" + username);

    if (username == null || username.isEmpty()) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized - No user found in the token");
    }

    // Fetch user profile data from the database
    User userProfile = userRepository.getUserByUserName(username);

    if (userProfile == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }

    // Return a limited view of the user profile
    User profile = new User();
    profile.setUserName(userProfile.getUserName());
    profile.setImageUrl(userProfile.getImageUrl());


    System.out.println("\n\nprofile: " + profile);
    // Return the user profile as response
    return ResponseEntity.ok().body(profile);
}

    @PostMapping("/uploadPost")
    public ResponseEntity<?> userPostUpload(  @RequestParam("file") MultipartFile file,
        @RequestParam String title,
        @RequestParam String tags,
        @RequestParam String description)
        
        
        {

        return userProfileService.uploadPost(
            file,
            title,
            tags,
            description
        );
    }


    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserPosts(@PathVariable Long userId){

        return userProfileService.getUserPosts(userId);
    }


    @GetMapping("/current-user")
    public ResponseEntity<?> currentUser(){

    Authentication authentication =
            SecurityContextHolder
            .getContext()
            .getAuthentication();

    String name = authentication.getName();

    System.out.println("\n\n\nauth getname : "+ name);

    User user = userRepository.getUserByUserName(name);

    return ResponseEntity.ok(user);

    }
    
    
    @PostMapping("/comment/{postId}")
    public ResponseEntity<?> saveComment(
        @RequestParam String text , 
         @PathVariable Long postId ){

        return userProfileService.saveComment(text,postId);
    }

    @PostMapping("/save/{postId}")

    public ResponseEntity<?> toggleSave(@PathVariable Long postId){

    return userProfileService.toggleSave(postId);
    
    }


    @GetMapping("/savedPosts")
    public ResponseEntity<?> getSavedPosts(){

    return userProfileService
            .getSavedPosts();
    }


    @GetMapping("/saved-ids")

public ResponseEntity<?> getSavedIds(){

    return userProfileService
            .getSavedIds();
}




   

}