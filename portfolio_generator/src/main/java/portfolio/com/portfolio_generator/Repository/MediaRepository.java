package portfolio.com.portfolio_generator.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import portfolio.com.portfolio_generator.Entities.Media;



@Repository
public interface MediaRepository extends JpaRepository<Media , Long> {

    
} 
    

