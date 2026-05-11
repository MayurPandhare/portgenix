package com.portgenix_generator.Repository;





import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.portgenix_generator.Entities.User;



@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("select u from User u where u.UserName = :username")
    public User getUserByUserName(@Param("username") String username);

    @Query("select e from User e where e.Email = :email")
    public User getUserByEmail(@Param("email") String email);

    @Query("select i from User i where i.Id = :id")
    public User getUserById(@Param("id") long id);

   
}