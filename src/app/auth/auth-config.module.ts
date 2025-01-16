
import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'https://my-app.auth.us-east-2.amazoncognito.com',
        authorizationEndpoint: 'https://my-app.auth.us-east-2.amazoncognito.com/oauth2/authorize',
        tokenEndpoint: 'https://my-app.auth.us-east-2.amazoncognito.com/oauth2/token',
        redirectUrl: window.location.origin,
        clientId: 'abc123abc123abc123',
        scope: 'email openid phone profile offline_access',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        ignoreNonceAfterRefresh: true,
        maxIdTokenIatOffsetAllowedInSeconds: 600,
        issValidationOff: false,
        autoUserInfo: false,
        secureRoutes: [],
        disablePkce: false,
        customParamsAuthRequest: {
          prompt: 'login'
        },
        postLogoutRedirectUri: window.location.origin,
        forbiddenRoute: '/forbidden',
        unauthorizedRoute: '/unauthorized',
        triggerAuthorizationResultEvent: true,
        historyCleanupOff: true,
        logLevel: LogLevel.Debug
      }
    })
  ],
  exports: [AuthModule]
})
export class AuthConfigModule { }
