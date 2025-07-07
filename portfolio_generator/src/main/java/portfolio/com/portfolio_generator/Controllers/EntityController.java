package portfolio.com.portfolio_generator.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import portfolio.com.portfolio_generator.Entities.Media;
import portfolio.com.portfolio_generator.Entities.PortfoliosDetails;
import portfolio.com.portfolio_generator.Entities.User;
import portfolio.com.portfolio_generator.Repository.MediaRepository;
import portfolio.com.portfolio_generator.Repository.PortfolioRepository;
import portfolio.com.portfolio_generator.Repository.UserRepository;

@RestController
@RequestMapping("/auth")
public class EntityController {

    @Autowired
    private  UserRepository  userRepository;

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private MediaRepository mediaRepository;

    @PostMapping("/user")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = userRepository.save(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);

        
    }

    @PostMapping("/portfolio")
    public ResponseEntity<PortfoliosDetails> createEntityB(@RequestBody PortfoliosDetails portfoliosDetails) {
        portfolioRepository.save(portfoliosDetails);
        return new ResponseEntity<>(portfoliosDetails, HttpStatus.CREATED);
    }

    @PostMapping("/media")
    public ResponseEntity<Media> createEntityC(@RequestBody Media media) {
        mediaRepository.save(media);
        return new ResponseEntity<>(media, HttpStatus.CREATED);
    }
    
    
}
