package com.portgenix_generator.Repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.portgenix_generator.Entities.UploadPost;
import com.portgenix_generator.Entities.User;

@Repository
public interface UploadPostRepository extends JpaRepository<UploadPost , Long> {

     // Get all posts of specific user
    List<UploadPost> findByUser(User user);


    
} 