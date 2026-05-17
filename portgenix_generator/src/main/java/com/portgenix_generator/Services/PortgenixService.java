package com.portgenix_generator.Services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.portgenix_generator.DTO.UserResponse;
import com.portgenix_generator.Entities.UploadPost;
import com.portgenix_generator.Entities.User;
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


   public ResponseEntity<?> searchPosts(String keyword){

    List<UploadPost> posts =
            uPostRepository
            .findByTitleContainingIgnoreCaseOrTagsContainingIgnoreCase(
                    keyword,
                    keyword
            );

            System.out.println("\n\n\nSearch results for '" + keyword + "': " + posts+ "\n\n\n");

    return ResponseEntity.ok(posts);
}


        public ResponseEntity<?> getSuggestions(String keyword){

                List<String> suggestions = uPostRepository.getTitleSuggestions(keyword);

                return ResponseEntity.ok(suggestions);
        }



        public ResponseEntity<?> getPostById(Long postId){

                Optional<UploadPost> post = uPostRepository.findById(postId);

                

                if(post.isPresent()){
                        return ResponseEntity.ok(post.get());
                        
                }

                return ResponseEntity.notFound().build();
              
                
        }

        public ResponseEntity<?> getRelatedPosts(Long postId){

                UploadPost currentPost = uPostRepository.findById(postId).orElse(null);

                if(currentPost == null){
                        return ResponseEntity.notFound().build();

                }

                String tags = currentPost.getTags();

                String firstTag = tags.split(",")[0];

                List<UploadPost> relatedPost = uPostRepository.findByTagsContainingIgnoreCase(firstTag);


                relatedPost.removeIf(post -> post.getId().equals(postId)
                );


                return ResponseEntity.ok(relatedPost);


        }


        public ResponseEntity<?> toggleLike(Long postId , Long userId){

                UploadPost post = uPostRepository.findById(postId).orElseThrow();

                List<Long> likedUsers = post.getLikedUserIds();

                boolean liked;

                if(likedUsers.contains(userId)){
                        
                        likedUsers.remove(userId);

                        liked = false;

                }else{
                        likedUsers.add(userId);

                        liked = true;
                }

                uPostRepository.save(post);

                Map<String , Object> response = new HashMap<>();

                response.put("liked",liked);

                response.put("likesCount", likedUsers.size());

                return ResponseEntity.ok(response);

        }


        public ResponseEntity<?> getUserByPostId(Long postId){

    UploadPost post =
        uPostRepository
        .findById(postId)
        .orElseThrow();

    User user = post.getUser();

        UserResponse response =
        new UserResponse();

        response.setId(user.getId());

        response.setUserName(
        user.getUserName()
        );

        response.setImageUrl(
        user.getImageUrl()
        );

        response.setLocation(
        user.getLocation()
        );

        return ResponseEntity.ok(response);
}
                
                



  
    
}
