package com.portgenix_generator.Services;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import com.portgenix_generator.JwtAuthentication.JwtService;

@Service
public class JwtApiService {


    
 
    @Autowired
    private JwtService jwtService;
    

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
}
