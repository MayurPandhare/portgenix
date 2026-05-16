package com.portgenix_generator.Entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name="UploadPost")

public class UploadPost {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 2000)
    private String description;

    private String imageUrl;

    private String publicId;

    private String tags;

    private LocalDateTime createdAt;

    @ElementCollection
    private List<Long> likedUserIds = new ArrayList<>();

    // Many posts belong to one user
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    // ==========================
    // AUTO TIMESTAMP
    // ==========================

    @PrePersist
    public void createdTime() {
        this.createdAt = LocalDateTime.now();
    }


    // ==========================
    // GETTERS AND SETTERS
    // ==========================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getPublicId() {
        return publicId;
    }

    public void setPublicId(String publicId) {
        this.publicId = publicId;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    public List<Long> getLikedUserIds() {
        return likedUserIds;
    }


    public void setLikedUserIds(List<Long> likedUserIds) {
        this.likedUserIds = likedUserIds;
    }

    

    
}
