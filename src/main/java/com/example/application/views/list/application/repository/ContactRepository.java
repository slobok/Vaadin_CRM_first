package com.example.application.views.list.application.repository;


import java.util.List;

import com.example.application.views.list.application.data.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ContactRepository extends JpaRepository<Contact, Long> {
	
	 @Query("select c from Contact c " +
		      "where lower(c.firstName) like lower(concat('%', :searchTerm, '%')) " +
		      "or lower(c.lastName) like lower(concat('%', :searchTerm, '%'))") 
		    List<Contact> search(@Param("searchTerm") String searchTerm);
	
	
}
