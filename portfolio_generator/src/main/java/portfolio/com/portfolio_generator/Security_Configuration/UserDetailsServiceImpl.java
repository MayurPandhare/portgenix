package portfolio.com.portfolio_generator.Security_Configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import portfolio.com.portfolio_generator.Entities.User;
import portfolio.com.portfolio_generator.Repository.UserRepository;

// 1 page Connected to CustomeUserDetails

// This page is connected to UserRepository



@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // Fetching User From Database

       User user = userRepository.getUserByUserName(username);

       if(user == null ){

        throw new UsernameNotFoundException("Could not found user !!");

       }

       CustomUserDetails customUserDetails = new CustomUserDetails(user);

        return customUserDetails;
    }

    
    
}
