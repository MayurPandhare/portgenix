package com.portgenix_generator.Controllers;

import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portgenix_generator.Entities.User;
import com.portgenix_generator.Services.JwtApiService;
import com.portgenix_generator.Services.UserAuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;



@RestController
@CrossOrigin(origins = "http://localhost:4500/") // Allow CORS for this specific method
@RequestMapping("/auth")
public class AuthController {

  

    @Autowired
    private UserAuthService userAuthService; 
    
    @Autowired
    private JwtApiService jwtApiService;



     
    



    @PostMapping("/validate-user")
    public ResponseEntity<Map<String, String>> validateUser(@RequestBody User user) {
     
    return userAuthService.validateUser(user);

    }
    


    //@CrossOrigin(origins = "http://192.168.101.74:4500") // Allow CORS for this specific method
    @PostMapping("/signup")
    public ResponseEntity <Map<String , String>> signup(@RequestBody @Valid User user) {
       
    return userAuthService.signup(user);
    }


       // @CrossOrigin(origins = "http://192.168.101.74:4500") // Allow CORS for this specific method
    @PostMapping("/save_user")
     public ResponseEntity<String> saveuser(@RequestBody User user){

    return userAuthService.saveuser(user);

    }

    @PostMapping("/login")
    public ResponseEntity <Map<String , String>> login(@RequestBody User user, HttpServletResponse response) {
           
     // Return access token in JSON response
    return userAuthService.login(user, response);
    }

        
     // Refresh Token API
    @PostMapping("/refresh")
    public ResponseEntity<Map<String, String>> refreshAccessToken(HttpServletRequest request) {
        
     // Return new access token
    return jwtApiService.refreshAccessToken(request);
    }


         //@CrossOrigin(origins = "http://192.168.101.74:4500") // Allow CORS for this specific method
    @PostMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
            
    return userAuthService.getUserProfile();
    }



    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletResponse response) {
   
    return userAuthService.logoutUser(response);
}
}
