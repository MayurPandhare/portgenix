package portfolio.com.portfolio_generator.Security_Configuration;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import portfolio.com.portfolio_generator.Entities.User;


    public class CustomUserDetails implements UserDetails {

    private User user;


    public CustomUserDetails( User user) {
        super();

        this.user = user;
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {

        return super.clone();
    }

    @Override
    public boolean equals(Object obj) {
    
        return super.equals(obj);
    }

    @Override
    protected void finalize() throws Throwable {

        super.finalize();
    }

    @Override
    public int hashCode() {

        return super.hashCode();
    }

    @Override
    public String toString() {

        return super.toString();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

    SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority(user.getRole());
        return List.of(simpleGrantedAuthority);
    }

    @Override
    public String getPassword() {

        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {

        return true;
    }

    @Override
    public boolean isAccountNonLocked() {

        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {

        return true;
    }

    
    
}
  

