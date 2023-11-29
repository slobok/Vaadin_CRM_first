package com.example.application.views.list.application.views.list;

import com.example.application.views.list.application.data.entity.Contact;
import com.example.application.views.list.application.services.CompanyService;
import com.example.application.views.list.application.services.ContactService;
import com.example.application.views.list.application.services.StatusService;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.PermitAll;
import org.springframework.context.annotation.Scope;
@org.springframework.stereotype.Component
@Scope("prototype")
@PermitAll
@PageTitle("Contacts | Vaadin CRM")
@Route(value = "",layout = MainLayout.class)
public class ListView extends VerticalLayout {

	public Grid < Contact > grid = new Grid <>(Contact.class);
	TextField filterText = new TextField();
    public ContactForm form;
  
    private final ContactService contactService;
    private final CompanyService companyService;
    private final StatusService statusService;
    
	public ListView(ContactService contactService,CompanyService companyService, StatusService statusService) {
		this.contactService = contactService;
    	this.companyService = companyService;
		this.statusService = statusService;
    	
		addClassName("list-view");
		setSizeFull();
		
		configureGrid();
		configureForm();
		
		add(
			getToolbar(),
			getContent()
		);
			
		updateList();
		closeEditor();
	}
	public void closeEditor(){
		form.setContact(null);
		form.setVisible(false);
		removeClassName("editing");
	}
    	
	private void updateList() {
		grid.setItems(contactService.findAllContact(filterText.getValue()));	
	}
	private Component getContent() {
		HorizontalLayout content = new HorizontalLayout (grid,form);
		content.setFlexGrow(2,grid);
		content.setFlexGrow(1, form);
		content.addClassName("content");
		content.setSizeFull();
		return content;		
	}

	private void configureForm() {
		form = new ContactForm(companyService.findAllCompanies(),statusService.getAllStatuses());
		form.setWidth("25em");
		form.addSaveListener(this::saveContact);
		form.addDeleteListener(this::deleteContact);
		form.addCloseListener(e -> closeEditor());
	}
	
	private void saveContact(ContactForm.SaveEvent event){
		contactService.saveContact(event.getContact());
		updateList();
		closeEditor();
	}
	private void deleteContact(ContactForm.DeleteEvent event){
		contactService.deleteContact(event.getContact());
		updateList();
		closeEditor();
	}
	private Component getToolbar() {
		filterText.setPlaceholder("Filter by name");
		filterText.setClearButtonVisible(true);
		filterText.setValueChangeMode(ValueChangeMode.LAZY);
		filterText.addValueChangeListener(e -> updateList());

		Button addButton = new Button("Add contact");
		addButton.addClickListener(e -> addContact());

		HorizontalLayout toolbar = new HorizontalLayout(filterText,addButton);
		toolbar.addClassName("toolbar");
		return toolbar;
	}

	private void addContact(){
		grid.asSingleSelect().clear();
		editContact(new Contact());
	}
	private void configureGrid(){
		grid.addClassName("contact-grid");
		grid.setSizeFull();
		grid.setColumns("firstName", "lastName", "email");
		grid.addColumn(contact -> contact.getCompany().getName()).setHeader("Company");
		grid.addColumn(contact -> contact.getStatus().getName()).setHeader("Status");
		grid.getColumns().forEach(col -> col.setAutoWidth(true));
		grid.asSingleSelect().addValueChangeListener(e -> editContact(e.getValue()));
	}
	private void editContact(Contact contact) {
		if(contact == null){
			closeEditor();
		}else {
			form.setContact(contact);
			form.setVisible(true);
			addClassName("editing");
		}
	}

}

