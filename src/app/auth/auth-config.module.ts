
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
        eagerLoadAuthWellKnownEndpoints: false,
        authWellknownEndpoints: {
          authorizationEndpoint: 'https://my-app.auth.us-east-2.amazoncognito.com/oauth2/authorize',
          tokenEndpoint: 'https://my-app.auth.us-east-2.amazoncognito.com/oauth2/token',
          userInfoEndpoint: 'https://my-app.auth.us-east-2.amazoncognito.com/oauth2/userInfo',
          endSessionEndpoint: 'https://my-app.auth.us-east-2.amazoncognito.com/logout',
          jwksUri: 'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_YOUR_USER_POOL_ID/.well-known/jwks.json'
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
