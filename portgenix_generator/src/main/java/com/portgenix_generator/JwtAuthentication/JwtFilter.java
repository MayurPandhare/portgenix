package com.portgenix_generator.JwtAuthentication;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
  
      public JwtFilter(JwtService jwtService) {
          this.jwtService = jwtService;
      }
  
      

      @Override
       protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
        throws ServletException, IOException {
       // Log all headers for debugging
       System.out.println("Incoming request URI: " + request.getRequestURI());
       System.out.println("Request Headers:");
       Collections.list(request.getHeaderNames()).forEach(header ->
    System.out.println(header + ": " + request.getHeader(header))
    );

String token = extractToken(request); // Extract the token
System.out.println("Extracted Token: " + token);
    if (token != null) {
        System.out.println("Token found, validating...");
        if (jwtService.isTokenValid(token)) {
            String username = jwtService.extractUsername(token);
            System.out.println("Valid Token. Username extracted: " + username);

            List<GrantedAuthority> authorities =
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));

            JwtAuthenticationToken authentication = new JwtAuthenticationToken(username, token, authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            System.out.println("Authentication set in security context.");
        } else {
            System.out.println("Token validation failed.");
        }
    } else {
        System.out.println("No token found in request.");
    }

    // Continue with the filter chain
    chain.doFilter(request, response);
}
      
  
      // Extract token from the header (Bearer token)
      private String extractToken(HttpServletRequest request) {
          String token = request.getHeader("Authorization");
          if (token != null && token.startsWith("Bearer ")) {
              return token.substring(7);  // Remove "Bearer " prefix
          }
          return null;
  
      }
  
                  
  
  
  }
  