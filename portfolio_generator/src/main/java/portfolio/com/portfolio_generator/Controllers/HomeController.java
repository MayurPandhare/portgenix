package portfolio.com.portfolio_generator.Controllers;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import portfolio.com.portfolio_generator.Entities.User;
import portfolio.com.portfolio_generator.JwtAuthentication.JwtService;
import portfolio.com.portfolio_generator.Repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://192.168.101.74:4500/") // Allow CORS for this specific method
@RequestMapping("/auth")
public class HomeController {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

     
    



    

   

   


    //@CrossOrigin(origins = "http://192.168.101.74:4500") // Allow CORS for this specific method
    @PostMapping("/signup")
    public ResponseEntity <Map<String , String>> signup(@RequestBody @Valid User user) {
        Map<String, String> response = new HashMap<>();

    // Print received data
    System.out.println("Username received: " + user.getUserName());
    System.out.println("Email received: " + user.getEmail());



    // Check for null or empty username
    if (user.getUserName() == null || user.getUserName().isEmpty()) {

        response.put("message", "Username cannot be null or empty");

        return ResponseEntity.badRequest().body(response);
    }

    // Check if email already exists
    if (userRepository.getUserByEmail(user.getEmail()) != null) {

        response.put("message",  "Email already exists");

        return ResponseEntity.badRequest().body(response);
    }

    // Check if username already exists
    if (userRepository.getUserByUserName(user.getUserName()) != null) {

        response.put("message", "User with name already exists");

        return ResponseEntity.badRequest().body(response);
    }

    // Initialize a new User entity
    User userEntity = new User();

    // Set user data to entity
    userEntity.setUserName(user.getUserName());
    userEntity.setEmail(user.getEmail());
    userEntity.setPassword(passwordEncoder.encode(user.getPassword())); // Password encoding
    userEntity.setFirstname(user.getFirstname());
    userEntity.setRole("User"); // Default role

     try {
        // Save user entity to the database
        userRepository.save(userEntity);

       


        // Log success
        System.out.println("User saved");


        // Prepare response
        response.put("userId", String.valueOf(userEntity.getId()));
        response.put("accessToken", jwtService.createAccessToken(user.getUserName()));
        response.put("refreshToken", jwtService.createRefreshToken(user.getUserName()));
        

        return ResponseEntity.ok(response); 

        
        } catch (DataIntegrityViolationException e) {



        System.out.println("Error saving user: " + e.getMessage());

        response.put("message", "Something went wrong");
        return ResponseEntity.badRequest().body(response);
    }
}

       // @CrossOrigin(origins = "http://192.168.101.74:4500") // Allow CORS for this specific method
        @PostMapping("/save_user")
        public ResponseEntity<String> saveuser(@RequestBody User user){

        System.out.println("\n\nUpdate user with location and img : \n\n");
        System.out.println("img:" + user.getImageUrl());
        System.out.println("\nlocation:" + user.getLocation());
        System.out.println("\nid: "+ user.getId() + "\n\n");
            try {

               // Find the existing user by userId
            User existingUser = userRepository.getUserById(user.getId());
            System.out.println("\n\nFound existing user:");
            if (existingUser == null) {
                    return ResponseEntity.badRequest().body("User not found.");
                }


             // Update user profile details
            existingUser.setImageUrl(user.getImageUrl());
            existingUser.setLocation(user.getLocation());

            // Save the updated user data
            userRepository.save(existingUser);
            System.out.println("\n\n User updated");

            return ResponseEntity.ok().body("User profile updated successfully");
                


            } catch (Exception e) {

                return ResponseEntity.badRequest().body("Something went wrong.");

            }

             
        }

        @PostMapping("/login")
        public ResponseEntity <Map<String , String>> login(@RequestBody User user, HttpServletResponse response) {
            Map<String, String> Mapresponse = new HashMap<>();

        
            System.out.println("\n\n Username : " + user.getEmail());
            System.out.println("\n\n Password : " + user.getPassword());
        
            // Retrieve user by email
            User existingUser = userRepository.getUserByEmail(user.getEmail());
        
            if (existingUser == null) {
                System.out.println("User does not exist");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "User does not exist."));
            }
        
            // Validate password
            if (!passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
                System.out.println("Invalid username or password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Invalid username or password."));
            }
        
            // Generate JWT tokens
            String accessToken = jwtService.createAccessToken(existingUser.getUserName());
            String refreshToken = jwtService.createRefreshToken(existingUser.getUserName());
            
            Mapresponse.put("accessToken", accessToken);

            // Set refresh token as HTTP-only cookie for security
            ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", refreshToken)
                    .httpOnly(true)     // Prevents JavaScript access (XSS protection)
                    .secure(true)       // Ensures cookies are sent only over HTTPS
                    .sameSite("None") // Prevents CSRF attacks
                    .path("/")          // Accessible throughout the application
                    .maxAge(7 * 24 * 60 * 60) // 7 days
                    .build();

                    System.out.println("\n\nrefresh token: " + refreshToken);
                    System.out.println("\n\nrefreshTokenCookie: " + refreshTokenCookie);
        
            response.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());
        
            System.out.println("User can login");
        
            // Return access token in JSON response
            return ResponseEntity.ok(Mapresponse);
        }

        
     // Refresh Token API
     @PostMapping("/refresh")
     public ResponseEntity<Map<String, String>> refreshAccessToken(HttpServletRequest request) {
         // Retrieve the refresh token from the HTTP-only cookie

         System.out.println("\n\nRefresh token Method: \n\n");

         String refreshToken = null;
         Cookie[] cookies = request.getCookies();

         System.out.println("\n\ncookie: " + cookies+"\n\n");

         if (cookies != null) {
             for (Cookie cookie : cookies) {
                System.out.println("\n\ncookie from loop : " + cookies+"\n");
                 if (cookie.getName().equals("refreshToken")) {
                     refreshToken = cookie.getValue();
                     break;
                 }
             }
         }

         System.out.println("\n\nRefresh token is: " + refreshToken);
     
         if (refreshToken == null) {
             return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                     .body(Map.of("error", "No refresh token found"));
         }
     
         // Validate refresh token and issue new access token
         String userName = jwtService.extractUsername(refreshToken);
         if (userName == null) {
             return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                     .body(Map.of("error", "Invalid refresh token"));
         }
     
         // Generate new access token
         String newAccessToken = jwtService.createAccessToken(userName);

         System.out.println("\n\nNew access token generated: \n\n");
     
         // Return new access token
         return ResponseEntity.ok(Map.of("accessToken", newAccessToken));
     }


         //@CrossOrigin(origins = "http://192.168.101.74:4500") // Allow CORS for this specific method
         @PostMapping("/profile")
         public ResponseEntity<?> getUserProfile() {
            System.out.println("\n\nAuth/profile:");
        // Get the username from the authentication context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();  // The username from JWT token

        System.out.println("\n\nUsername-auth:"+ username);

        // Fetch user profile data from the database
        User userProfile = userRepository.getUserByUserName(username);

        User profile  = new User();

        profile.setUserName(userProfile.getUserName());
        profile.setImageUrl(userProfile.getImageUrl());
            
        System.out.println("\n\n profile: " + profile);
        // Return the user profile as response
        return ResponseEntity.ok().body(profile);
    }



    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletResponse response) {
    ResponseCookie deleteCookie = ResponseCookie.from("refreshToken", "")
            .httpOnly(true)
            .secure(true)
            .sameSite("Strict")
            .path("/")
            .maxAge(0) // Expire the cookie
            .build();

    response.addHeader(HttpHeaders.SET_COOKIE, deleteCookie.toString());
    return ResponseEntity.ok("Logged out successfully.");
}
}
