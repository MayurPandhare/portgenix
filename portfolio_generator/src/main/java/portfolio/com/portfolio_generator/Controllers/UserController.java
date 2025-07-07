package portfolio.com.portfolio_generator.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import portfolio.com.portfolio_generator.Entities.User;
import portfolio.com.portfolio_generator.JwtAuthentication.JwtService;
import portfolio.com.portfolio_generator.Repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://192.168.101.72:4500/") // Allow CORS for this specific method
@RequestMapping("/user")
public class UserController {
    

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

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

}