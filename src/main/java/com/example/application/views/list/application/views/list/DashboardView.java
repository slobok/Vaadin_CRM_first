package com.example.application.views.list.application.views.list;

import com.example.application.views.list.application.services.CompanyService;
import com.example.application.views.list.application.services.ContactService;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.charts.Chart;
import com.vaadin.flow.component.charts.model.ChartType;
import com.vaadin.flow.component.charts.model.DataSeries;
import com.vaadin.flow.component.charts.model.DataSeriesItem;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.PermitAll;
@PermitAll
@Route(value = "dashboard",layout = MainLayout.class)
@PageTitle("Dashboard | VaadinCrm")
public class DashboardView extends VerticalLayout {
    private  ContactService contactService;
    private CompanyService companyService;
    public DashboardView(ContactService contactService,
                         CompanyService companyService) {
        this.contactService = contactService;
        this.companyService = companyService;
        addClassName("dashboard-view");
        setDefaultHorizontalComponentAlignment(Alignment.CENTER);
        add(getContactStats(),getCompaniesChart());

    }

    private Component getCompaniesChart() {
        Chart chart =  new Chart(ChartType.PIE);
        DataSeries dataSeries = new DataSeries();
        companyService.findAllCompanies().forEach(company -> {
            dataSeries.add( new DataSeriesItem(company.getName(),company.getEmployeeCount()));
        });
        chart.getConfiguration().setSeries(dataSeries);
        return  chart;
    }

    private Component getContactStats() {
        Span stats =  new Span(contactService.countContacts() + " contacts");
        stats.addClassNames("text-xl","mt-m");
        return stats;
    }
}
