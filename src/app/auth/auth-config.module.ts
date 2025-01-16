
import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_YOUR_USER_POOL_ID',
        redirectUrl: window.location.origin,
        clientId: 'abc123abc123abc123',
        scope: 'openid profile email phone',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        ignoreNonceAfterRefresh: true,
        maxIdTokenIatOffsetAllowedInSeconds: 600,
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
