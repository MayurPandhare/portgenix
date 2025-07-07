package portfolio.com.portfolio_generator.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import portfolio.com.portfolio_generator.Entities.PortfoliosDetails;
import portfolio.com.portfolio_generator.Services.PortfolioService;

@RequestMapping("/api/portfolio")
@RestController
public class PortfolioController {
    

    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

                                                            //TODO: Create a portfolio


    @PostMapping("/Create")
    public ResponseEntity<PortfoliosDetails> createPortfolio(@RequestBody PortfoliosDetails portfolio) {
        PortfoliosDetails createdPortfolio = portfolioService.createPortfolio(portfolio);
        return new ResponseEntity<>(createdPortfolio, HttpStatus.CREATED);
    }

                                                            //TODO: Get a portfolio by ID


    @GetMapping("/{id}")
    public ResponseEntity<PortfoliosDetails> getPortfolioById(@PathVariable Long id) {
        PortfoliosDetails portfolio = portfolioService.getPortfolioById(id);
        return ResponseEntity.ok(portfolio);
    }

                                                            // TODO: Update a portfolio


    @PutMapping("/{id}")
    public ResponseEntity<PortfoliosDetails> updatePortfolio(
            @PathVariable Long id, 
            @RequestBody PortfoliosDetails portfolio) {
        PortfoliosDetails updatedPortfolio = portfolioService.updatePortfolio(id, portfolio);
        return ResponseEntity.ok(updatedPortfolio);
    }

                                                            //TODO: Delete a portfolio


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePortfolio(@PathVariable Long id) {
        portfolioService.deletePortfolio(id);
        return ResponseEntity.noContent().build();
    }
}
