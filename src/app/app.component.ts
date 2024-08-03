import { Component, OnInit } from '@angular/core';
import { AuthService } from './pages/login/auth.service';
import { Router } from '@angular/router';
import { FilterMatchMode, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../../public/scss/reset.scss', './app.component.scss'],
})
export class AppComponent {
  isLoggedIn = this.authService.isLoggedIn;

  constructor(
    public authService: AuthService,
    private router: Router,
    private primengConfig: PrimeNGConfig
  ) {
    this.isLoggedIn = this.authService.isLogined();
  }

  ngOnInit() {
    // this.authService.refreshAccessToken().subscribe();
    this.primengConfig.ripple = true;

    // ZIndex
    this.primengConfig.zIndex = {
      modal: 1100, // dialog, sidebar
      overlay: 1000, // dropdown, overlaypanel
      menu: 1000, // overlay menus
      tooltip: 1100, // tooltip
    };

    // Filter Mode
    this.primengConfig.filterMatchModeOptions = {
      text: [
        FilterMatchMode.STARTS_WITH,
        FilterMatchMode.CONTAINS,
        FilterMatchMode.NOT_CONTAINS,
        FilterMatchMode.ENDS_WITH,
        FilterMatchMode.EQUALS,
        FilterMatchMode.NOT_EQUALS,
      ],
      numeric: [
        FilterMatchMode.EQUALS,
        FilterMatchMode.NOT_EQUALS,
        FilterMatchMode.LESS_THAN,
        FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
        FilterMatchMode.GREATER_THAN,
        FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
      ],
      date: [
        FilterMatchMode.DATE_IS,
        FilterMatchMode.DATE_IS_NOT,
        FilterMatchMode.DATE_BEFORE,
        FilterMatchMode.DATE_AFTER,
      ],
    };

    this.primengConfig.setTranslation({
      accept: 'Accept',
      reject: 'Cancel',
    });
  }

  isLogined() {
    return this.authService.isLogined();
  }
}
