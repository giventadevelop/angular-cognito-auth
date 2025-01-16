// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isAuthenticated = false;

  constructor(private authService: OidcSecurityService) {}

  ngOnInit() {
    this.authService.checkAuth().subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;
      console.log('app authenticated', isAuthenticated);
    });
  }

  login() {
    console.log('Initiating login...');
    this.authService.authorize();
  }
}
