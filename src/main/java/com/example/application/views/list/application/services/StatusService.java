package com.example.application.views.list.application.services;

import java.util.List;

import com.example.application.views.list.application.data.entity.Status;
import com.example.application.views.list.application.repository.StatusRepository;
import org.springframework.stereotype.Service;

@Service
public class StatusService {
	private final StatusRepository statusRepository;


	public StatusService(StatusRepository statusRepository) {
		this.statusRepository = statusRepository;
	}
	
	public List <Status> getAllStatuses() {
		return statusRepository.findAll();
	}
	
}
