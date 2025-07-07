package portfolio.com.portfolio_generator.Entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="portfolio_details")

public class PortfoliosDetails {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Pid;  

   
    @Column(name = "title", nullable = false)
    private String Ptitle;  // Title of the portfolio (e.g., "Web Developer Portfolio").

    @Column(name = "description", length = 1000)
    private String Pdescription;
    
    @Column(name = "template_id")
    private Long templateId;

    @Column(name = "is_published", nullable = false)
    private Boolean isPublished = false;


     @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Media> mediaFiles = new ArrayList<>();

    



                                                            //TODO : Getter and Setter

    public PortfoliosDetails() {
    }
                                                        
    public PortfoliosDetails(String description, User user) {
        this.Pdescription = description;
        this.user = user;
    }                                                        

   

    // Getters and Setters
    public Long getId() {
        return Pid;
    }

    public void setId(Long id) {
        this.Pid = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getTitle() {
        return Ptitle;
    }

    public void setTitle(String title) {
        this.Ptitle = title;
    }

    public String getDescription() {
        return Pdescription;
    }

    public void setDescription(String description) {
        this.Pdescription = description;
    }

    
}
