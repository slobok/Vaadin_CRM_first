package com.example.application.views.list.application.repository;


import com.example.application.views.list.application.data.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {

}
