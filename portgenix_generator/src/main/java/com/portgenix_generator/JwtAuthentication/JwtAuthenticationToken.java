package com.portgenix_generator.JwtAuthentication;



import java.util.List;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

public class JwtAuthenticationToken extends AbstractAuthenticationToken {
    private final String principal;  // Username or any other identifier
    private final String credentials;  // JWT token

    // Constructor to create token for authentication
    public JwtAuthenticationToken(String principal, String credentials) {
        super(null);  // Roles/authorities are not set initially
        this.principal = principal;
        this.credentials = credentials;
        setAuthenticated(false);  // Initially, it's not authenticated
    }

    // Constructor to set authorities
    public JwtAuthenticationToken(String principal, String credentials, List<GrantedAuthority> authorities) {
        super(authorities);  // Set authorities here
        this.principal = principal;
        this.credentials = credentials;
        setAuthenticated(true);  // Mark as authenticated
    }

    @Override
    public Object getCredentials() {
        return this.credentials;
    }

    @Override
    public Object getPrincipal() {
        return this.principal;
    }
}
