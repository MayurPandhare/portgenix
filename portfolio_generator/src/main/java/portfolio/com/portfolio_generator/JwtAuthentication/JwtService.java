package portfolio.com.portfolio_generator.JwtAuthentication;



import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class JwtService {

    private final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Secure random key
    private static final long ACCESS_TOKEN_EXPIRATION_TIME = 15 * 60 * 1000; // 15 minutes
    private static final long REFRESH_TOKEN_EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days

    public String createAccessToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME))
                .signWith(secretKey)
                .compact();
    }

    public String createRefreshToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION_TIME))
                .signWith(secretKey)
                .compact();
    }

    public Claims parseToken(String token) {
        try {
            System.out.println("Parsing token: " + token);
            return Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (SignatureException e) {
            System.out.println("Invalid JWT signature");
            throw new RuntimeException("Invalid JWT signature", e);
        } catch (ExpiredJwtException e) {
            System.out.println("JWT token has expired");
            throw new RuntimeException("JWT token has expired", e);
        } catch (UnsupportedJwtException e) {
            System.out.println("Unsupported JWT token");
            throw new RuntimeException("Unsupported JWT token", e);
        } catch (MalformedJwtException e) {
            System.out.println("Malformed JWT token");
            throw new RuntimeException("Malformed JWT token", e);
        } catch (JwtException | IllegalArgumentException e) {
            System.out.println("General JWT exception: " + e.getMessage());
            throw new RuntimeException("Invalid JWT token", e);
        }
    }

public boolean isTokenValid(String token) {
    try {
        System.out.println("Validating token...");
        Claims claims = parseToken(token);
        boolean isExpired = claims.getExpiration().before(new Date());
        if (isExpired) {
            System.out.println("Token has expired.");
        }
        return !isExpired;
    } catch (JwtException | IllegalArgumentException e) {
        System.out.println("Token validation failed: " + e.getMessage());
        return false;
    }
}

    public String extractUsername(String token) {
        return parseToken(token).getSubject();
    }

    public String extractRefreshTokenFromCookie(HttpServletRequest request) {
        if (request.getCookies() == null) return null;
        for (Cookie cookie : request.getCookies()) {
            if ("refreshToken".equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }
}


   