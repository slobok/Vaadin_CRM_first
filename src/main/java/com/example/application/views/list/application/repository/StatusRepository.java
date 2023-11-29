package com.example.application.views.list.application.repository;


import com.example.application.views.list.application.data.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Long> {

}
