// src/app/app.component.ts

import { Component } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private authService: OidcSecurityService) {}

  login() {
    this.authService.authorize();
  }
}
