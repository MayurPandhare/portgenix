package portfolio.com.portfolio_generator.Services;

import java.lang.module.ResolutionException;

import org.springframework.stereotype.Service;

import portfolio.com.portfolio_generator.Entities.PortfoliosDetails;
import portfolio.com.portfolio_generator.Repository.PortfolioRepository;

@Service
public class PortfolioService {


    private final PortfolioRepository portfolioRepository;

    public PortfolioService(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;
    }


                                                        //TODO: To Create Portfolios


    public PortfoliosDetails createPortfolio(PortfoliosDetails portfolio) {
        return portfolioRepository.save(portfolio);
    }


                                                         //TODO: To Get Portfolios by ID

    public PortfoliosDetails getPortfolioById(Long id) {
        return portfolioRepository.findById(id)
        .orElseThrow(ResolutionException::new);

    }

                                                        //TODO: To Update Portfolios by ID

    public PortfoliosDetails updatePortfolio(Long id, PortfoliosDetails portfolio) {
        PortfoliosDetails existingPortfolio = getPortfolioById(id);
        existingPortfolio.setTitle(portfolio.getTitle());
        existingPortfolio.setDescription(portfolio.getDescription());
        return portfolioRepository.save(existingPortfolio);
    }


                                                        //TODO: To Delete Portfolios by ID

    public void deletePortfolio(Long id) {
        PortfoliosDetails existingPortfolio = getPortfolioById(id);
        portfolioRepository.delete(existingPortfolio);
    }
    
    
}
