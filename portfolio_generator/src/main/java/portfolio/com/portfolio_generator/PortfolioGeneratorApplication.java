package portfolio.com.portfolio_generator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@ComponentScan
public class PortfolioGeneratorApplication  {



	public static void main(String[] args) {
		SpringApplication.run(PortfolioGeneratorApplication.class, args);


	}

    
	@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("http://localhost:4500")  // Update to match the frontend URL
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Allowing more HTTP methods
                    .allowedHeaders("Authorization", "Content-Type")  // Ensure the correct headers are allowed
                    .allowCredentials(true)  // Allow credentials if needed (e.g., cookies, authorization headers)
                    .exposedHeaders(HttpHeaders.SET_COOKIE);
            }
        };
    }


}
