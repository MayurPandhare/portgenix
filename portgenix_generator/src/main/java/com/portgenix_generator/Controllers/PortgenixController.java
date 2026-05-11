package com.portgenix_generator.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portgenix_generator.JwtAuthentication.JwtService;
import com.portgenix_generator.Repository.UploadPostRepository;
import com.portgenix_generator.Repository.UserRepository;
import com.portgenix_generator.Services.PortgenixService;
import com.portgenix_generator.Services.UserProfileService;

@RequestMapping("/portgenix")
@RestController
public class PortgenixController {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UploadPostRepository uPostRepository;

    @Autowired
    private UserProfileService userProfileService;

    @Autowired
    private PortgenixService postService;



    @GetMapping("/posts")
    public ResponseEntity<?> getAllPosts(){

    return postService.getAllPosts();
}
    


   
}
