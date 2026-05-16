package com.portgenix_generator.Repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.portgenix_generator.Entities.UploadPost;
import com.portgenix_generator.Entities.User;

@Repository
public interface UploadPostRepository extends JpaRepository<UploadPost , Long> {

     // Get all posts of specific user
    List<UploadPost> findByUser(User user);

    List<UploadPost>
    findByTitleContainingIgnoreCaseOrTagsContainingIgnoreCase(
        String title,
        String tags
    );

    @Query("""
    SELECT DISTINCT p.title
    FROM UploadPost p
    WHERE LOWER(p.title)
    LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    List<String> getTitleSuggestions( @Param("keyword") String keyword);

    List<UploadPost> findByUser_Id(Long id);

    List<UploadPost> findByTagsContainingIgnoreCase(String tags);

    
} 