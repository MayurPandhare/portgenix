package com.portgenix_generator.Services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.portgenix_generator.Entities.Comment;
import com.portgenix_generator.Entities.UploadPost;
import com.portgenix_generator.Entities.User;
import com.portgenix_generator.Repository.CommentRepository;
import com.portgenix_generator.Repository.UploadPostRepository;
import com.portgenix_generator.Repository.UserRepository;

@Service
public class UserProfileService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UploadPostRepository uPostRepository;

    @Autowired
    private CommentRepository commentRepository;

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

    System.out.println("\n\n \n\nCurrent User ID: "+ currentUser.getId());

    // VERY IMPORTANT
    post.setUser(currentUser);

    uPostRepository.save(post);

    return ResponseEntity.ok(post);

}


    public ResponseEntity<?> getUserPosts(Long userId){

        List<UploadPost> posts = uPostRepository.findByUser_Id(userId);

        return ResponseEntity.ok(posts);
    }




    public ResponseEntity<?> saveComment(String text, Long postId){

        Authentication authentication = SecurityContextHolder
            .getContext()
            .getAuthentication();

    String name = authentication.getName();

    System.out.println("this is showing name: "+name);

    User currentUser = userRepository.getUserByUserName(name);

    System.out.println("this is showing current user: "+currentUser);

        // FIND POST
    UploadPost post =uPostRepository.findById(postId).orElseThrow();

     // CREATE COMMENT
    Comment comment = new Comment();

    comment.setText(text);

    comment.setCreatedAt(
            LocalDateTime.now()
    );

    comment.setUser(currentUser);

    comment.setPost(post);


    // SAVE
    commentRepository.save(comment);


    return ResponseEntity.ok(comment);

    }
    
}
