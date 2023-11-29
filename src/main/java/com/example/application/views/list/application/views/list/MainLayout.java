package com.example.application.views.list.application.views.list;

import com.example.application.views.list.application.services.SecurityService;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.HighlightConditions;
import com.vaadin.flow.router.RouterLink;

public class MainLayout extends AppLayout {

    private final SecurityService securityService;

    public MainLayout(SecurityService securityService){
        this.securityService = securityService;
        createHeader();
        createDrawer();
      }

    private void createDrawer() {
     H1 logo =   new H1("Vaadin crm");
     logo.addClassNames("text-l","m-m");
     Button logOut = new Button("Log Out", e -> securityService.logout());
     HorizontalLayout header =   new HorizontalLayout(new DrawerToggle(),logo,logOut);
     header.setDefaultVerticalComponentAlignment(FlexComponent.Alignment.CENTER);
     header.expand(logo);
     header.setWidthFull();
     header.addClassNames("py-0","px-m");
     addToNavbar(header);
    }

    private void createHeader() {
        RouterLink listView = new RouterLink("List", ListView.class);
        listView.setHighlightCondition(HighlightConditions.sameLocation());
        RouterLink dashboardView = new RouterLink("Dashboard", DashboardView.class);
        addToDrawer(new VerticalLayout(
                listView,
                dashboardView
                )
        );
    }
}
