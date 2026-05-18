package com.portgenix_generator.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.portgenix_generator.Entities.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment , Long> {
    
    List<Comment> findByPostId(Long id);

}