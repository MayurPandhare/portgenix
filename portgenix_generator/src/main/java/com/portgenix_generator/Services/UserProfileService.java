package com.portgenix_generator.Services;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.portgenix_generator.Entities.UploadPost;
import com.portgenix_generator.Entities.User;
import com.portgenix_generator.Repository.UploadPostRepository;
import com.portgenix_generator.Repository.UserRepository;

@Service
public class UserProfileService {





    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UploadPostRepository uPostRepository;


     @Autowired
    private CloudinaryService cloudinaryService;


    public ResponseEntity<?> uploadPost(
       MultipartFile file,
        String title,
        String tags,
        String description

) {

   Authentication authentication = SecurityContextHolder
            .getContext()
            .getAuthentication();

    String name = authentication.getName();

    System.out.println("this is showing name: "+name);

    User currentUser = userRepository.getUserByUserName(name);

    System.out.println("this is showing current user: "+currentUser);


    // Upload image
    Map result = cloudinaryService.uploadFile(file);

    String imageUrl = (String) result.get("secure_url");

    String publicId = (String) result.get("public_id");

    // Create post
    UploadPost post = new UploadPost();

    post.setTitle(title);
    post.setDescription(description);
    post.setTags(tags);

    post.setImageUrl(imageUrl);

    post.setPublicId(publicId);

    // VERY IMPORTANT
    post.setUser(currentUser);

    uPostRepository.save(post);

    return ResponseEntity.ok(post);

}


    public ResponseEntity<?> getUserPosts(Long userId){

        List<UploadPost> posts = uPostRepository.findByUser_Id(userId);

        return ResponseEntity.ok(posts);
    }
    
}
