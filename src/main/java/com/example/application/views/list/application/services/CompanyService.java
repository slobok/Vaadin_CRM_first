package com.example.application.views.list.application.services;

import java.util.List;

import com.example.application.views.list.application.data.entity.Company;
import com.example.application.views.list.application.repository.CompanyRepository;
import org.springframework.stereotype.Service;

@Service
public class CompanyService {
	private final CompanyRepository companyRepository;

	public CompanyService(CompanyRepository companyRepository) {
			this.companyRepository = companyRepository;
	}
	
	public List <Company> findAllCompanies() {
		return companyRepository.findAll();
	}
	
	
}
