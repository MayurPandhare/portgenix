package com.portgenix_generator.Entities;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;



@Entity
@Table(name="Users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private Long Id;

    @NotBlank(message = "Name Can not be Empty!")
    @Size(min = 3,max = 30)
    
    @Column(name = "first_name")
    private String Firstname;

   

    @Column(unique = true)
    @NotBlank(message = "Email Can not be Empty!")
    @Email(message = "Please enter a valid email address (e.g., user@example.com)")
    private String Email;

    @NotBlank(message = "Password Can not be Empty!")
   // @Size(min = 6)
    @JsonIgnore
    private String Password;

    private String Role;

    @Column(nullable = false, unique = true)
    private String UserName;

    private String ImageUrl;

    private String Location;

    


                                     //TODO : Getters and setters

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UploadPost> uploadPost = new ArrayList<>();
                                                        
   

    public User() {
        super();
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getFirstname() {
        return Firstname;
    }

    public void setFirstname(String firstname) {
        Firstname = firstname;
    }

    

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getRole() {
        return Role;
    }

    public void setRole(String role) {
        Role = role;
    }

   

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String userName) {
        UserName = userName;
    }

    

    
    
    public String getImageUrl() {
        return ImageUrl;
    }

    public void setImageUrl(String imageUrl) {
        ImageUrl = imageUrl;
    }

    public String getLocation() {
        return Location;
    }

    public void setLocation(String location) {
        Location = location;
    }

    public List<UploadPost> getUploadPost() {
        return uploadPost;
    }

    public void setUploadPost(List<UploadPost> uploadPost) {
        this.uploadPost = uploadPost;
    }



   

    @Override
    public String toString() {
        return "User [Id=" + Id + ", Firstname=" + Firstname + ", Email=" + Email  + ",Role=" + Role  +", UserName="+ UserName + ", imageUrl=" + ImageUrl +",Location= "+ Location +"]";
    }




    


    



    
    


    
}
