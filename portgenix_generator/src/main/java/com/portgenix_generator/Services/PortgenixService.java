package com.portgenix_generator.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.portgenix_generator.Entities.UploadPost;
import com.portgenix_generator.JwtAuthentication.JwtService;
import com.portgenix_generator.Repository.UploadPostRepository;
import com.portgenix_generator.Repository.UserRepository;

@Service
public class PortgenixService {


 @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UploadPostRepository uPostRepository;

    @Autowired
    private UserProfileService userProfileService;



    public ResponseEntity<?> getAllPosts(){

    List<UploadPost> posts = uPostRepository.findAll();

    System.out.println("Posts retrieved: " + posts);

    return ResponseEntity.ok(posts);
}
  
    
}
