package com.example.application.views.list.application.services;

import com.example.application.views.list.application.repository.ContactRepository;
import org.springframework.stereotype.Service;

import com.example.application.views.list.application.data.entity.Contact;
import java.util.List;

@Service
public class ContactService {

	private final ContactRepository contactRepository;
	
	public ContactService(ContactRepository contactRepository) {
		this.contactRepository = contactRepository;
	}
	
	public List < Contact > findAllContact(String filterText){
		if(filterText == null || filterText.isEmpty()){
			return contactRepository.findAll();
		}
		else {
			return contactRepository.search(filterText);
		}
	}

	public long countContacts(){
		return contactRepository.count();
	}
	public void deleteContact(Contact contact){
		contactRepository.delete(contact);
	}
	public void saveContact(Contact contact)throws IllegalArgumentException{
		if (contact == null) {
			System.out.println("Contact is null");
			throw new 
			IllegalArgumentException("Contact can not bee null ");
		}
		contactRepository.save(contact);
	}
}
