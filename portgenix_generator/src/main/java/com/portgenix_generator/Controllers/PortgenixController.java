package com.portgenix_generator.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    private PortgenixService  PortgenixService;



    @GetMapping("/posts")
    public ResponseEntity<?> getAllPosts(){

    return PortgenixService.getAllPosts();
    }


    @GetMapping("/search")
    public ResponseEntity<?> searchPosts(@RequestParam String keyword){


        System.out.println("\n\n\nReceived search request with keyword: " + keyword + "\n\n\n");

        return PortgenixService.searchPosts(keyword);
    }

    @GetMapping("/suggestions")
    public ResponseEntity<?> getSuggestions(@RequestParam String keyword){

        return PortgenixService.getSuggestions(keyword);
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<?> getPost(@PathVariable Long postId){

        return PortgenixService.getPostById(postId);

    }

    @GetMapping("/post/{postId}/related")
    public ResponseEntity<?> getRelatedPost(@PathVariable Long postId){

        return PortgenixService.getRelatedPosts(postId);
    }


    @PostMapping("/like/{postId}/{userId}")
    public ResponseEntity<?> likePost(@PathVariable Long postId, @PathVariable Long userId){

        return PortgenixService.toggleLike(postId, userId);
    }


    


   
}
