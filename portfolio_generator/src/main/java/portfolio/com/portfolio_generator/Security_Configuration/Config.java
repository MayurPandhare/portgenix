package portfolio.com.portfolio_generator.Security_Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import jakarta.servlet.http.HttpServletResponse;
import portfolio.com.portfolio_generator.JwtAuthentication.JwtFilter;



    
@Configuration
@EnableWebSecurity
public class Config {


     private final JwtFilter jwtFilter;


    public Config(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }





    @Bean
    public UserDetailsService getUserDetailService() {
        return new UserDetailsServiceImpl();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider AuthenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();

        daoAuthenticationProvider.setUserDetailsService(this.getUserDetailService());
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
    
        return daoAuthenticationProvider;
    }

    
@Bean
@SuppressWarnings({ "deprecation", "removal" })
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http
        .csrf(csrf -> csrf.disable())  // Enable CSRF protection (instead of disable())
        .authorizeRequests(auth -> auth
            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() 
            .requestMatchers("/auth/signup", "/auth/login", "/auth/logout").permitAll() // Public endpoints
            .requestMatchers("/auth/save_user").permitAll()
            .requestMatchers("/auth/refresh").permitAll()
            .requestMatchers("/user/header").authenticated()  // Secure the /auth/profile endpoint
            .requestMatchers("/user/profile").authenticated()  // Secure /user/profile endpoint
            .anyRequest().permitAll() // Allow all other requests
        )
        .logout(logout -> logout
            .logoutUrl("/auth/logout") // Define the logout URL
            .invalidateHttpSession(true) // Invalidate the session
            .deleteCookies("JSESSIONID") // Delete the session cookie
            .logoutSuccessHandler((request, response, authentication) -> {
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write("{\"message\": \"Logout successful\"}");
                response.setContentType("application/json");
            })
        )
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class) // Add the JWT filter before standard authentication filter
        .build(); // Finalize the configuration
}



  

     @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

  
}

