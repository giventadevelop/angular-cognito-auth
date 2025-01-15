// src/app/home/home.component.ts

import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, EMPTY, Observable } from 'rxjs';
import { takeUntil, take, catchError, finalize } from 'rxjs/operators';

interface UserData {
  sub?: string;
  [key: string]: any;
}

@Component({
  selector: 'app-home',
  template: `
    <h1 *ngIf="isLoggedIn">User logged in successfully!</h1>
    <h1 *ngIf="!isLoggedIn">Sign in failed!</h1>
    <div *ngIf="isLoading" class="loading-message">
      <p>Authenticating...</p>
    </div>
    <div *ngIf="isLoggedIn">
      <h2>User Details:</h2>
      <pre>{{ userDetails | json }}</pre>
    </div>
    <button (click)="logout()">Logout</button>
  `,
  styles: [
    `
      .loading-message {
        padding: 10px;
        background-color: #e3f2fd;
        border-radius: 4px;
        margin: 10px 0;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  userDetails: UserData | null = null;
  userData$ = this.oidcSecurityService.userData$;
  authError: string | null = null;
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();
  // Auth configuration
  private readonly authConfig = {
    cognitoDomain: 'us-east-2fx0foj6hs.auth.us-east-2.amazoncognito.com',
    clientId: '5td15o52te3e32nir868jih1j7',
    redirectUri: 'http://localhost:4200/oauth2/idpresponse',
    logoutUri: 'http://localhost:4200',
  };
  isLoading = false;

  constructor(private oidcSecurityService: OidcSecurityService) {}

  ngOnInit(): void {
    this.userData$ = this.oidcSecurityService.userData$;
    this.oidcSecurityService.getUserData().subscribe((userData: UserData) => {
      if (userData) {
        this.isLoggedIn = true;
        this.userDetails = userData;
        sessionStorage.setItem('userData', JSON.stringify(userData));
      } else {
        this.isLoggedIn = false;
      }
    });

    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        if (params['code'] && params['state']) {
          console.log('Auth Code received:', params['code']);
          this.handleAuthCallback(params);
        }
      });

    // Monitor user data changes
    this.userData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((userData: UserData) => {
        if (userData) {
          this.storeUserData(userData);
        }
      });
  }

  logout() {
    this.oidcSecurityService.logoff();
    try {
      if (window.sessionStorage) {
        window.sessionStorage.clear();
      }

      const logoutUrl =
        `https://${this.authConfig.cognitoDomain}/logout?` +
        `client_id=${this.authConfig.clientId}&` +
        `logout_uri=${encodeURIComponent(this.authConfig.logoutUri)}`;

      window.location.href = logoutUrl;
    } catch (error) {
      console.error('Logout error:', error);
      this.authError = 'Logout failed';
    }
  }

  private handleAuthCallback(params: any): void {
    this.isLoading = true;
    try {
      sessionStorage.setItem('authCode', params['code']);
      sessionStorage.setItem('authState', params['state']);

      this.oidcSecurityService
        .checkAuth()
        .pipe(
          take(1),
          finalize(() => (this.isLoading = false))
        )
        .subscribe({
          next: ({ isAuthenticated }) => {
            console.log('Auth callback status:', isAuthenticated);
            if (isAuthenticated) {
              this.isLoggedIn = true;
              this.router.navigate(['/']);
            } else {
              console.log(
                'Authentication failed, attempting to login again...'
              );
              setTimeout(() => {
                this.oidcSecurityService.authorize();
              }, 1000);
            }
          },
          error: (error) => {
            console.error('Auth callback error:', error);
            this.authError = 'Authentication failed';
            setTimeout(() => {
              this.oidcSecurityService.authorize();
            }, 1000);
          },
        });
    } catch (error) {
      this.isLoading = false;
      console.error('Auth callback processing error:', error);
      this.authError = 'Failed to process authentication callback';
    }
  }

  private checkAuthenticationStatus(): void {
    this.oidcSecurityService
      .checkAuth()
      .pipe(
        catchError((error) => {
          this.authError = 'Authentication check failed';
          return EMPTY;
        })
      )
      .subscribe(({ isAuthenticated }) => {
        this.isLoggedIn = isAuthenticated;
        console.log('isAuthenticated', isAuthenticated);
      });
  }

  private storeUserData(userData: UserData): void {
    try {
      this.userDetails = userData;
      sessionStorage.setItem('userData', JSON.stringify(userData));
      console.log('User data stored:', userData);
    } catch (error) {
      console.error('Error storing user data:', error);
      this.authError = 'Failed to store user data';
    }
  }
}
