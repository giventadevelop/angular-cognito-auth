// src/app/auth/auth.module.ts
import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_fX0foj6hs',
        redirectUrl: window.location.origin,
        clientId: '5td15o52te3e32nir868jih1j7',
        scope: 'email openid phone profile',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        ignoreNonceAfterRefresh: true, 
        maxIdTokenIatOffsetAllowedInSeconds: 600,
        issValidationOff: true, // Set to true for Cognito
        autoUserInfo: true,
        secureRoutes: [],
        customParamsAuthRequest: {
          prompt: 'login',
        },
        postLogoutRedirectUri: window.location.origin,
        forbiddenRoute: '/forbidden',
        unauthorizedRoute: '/unauthorized',
        triggerAuthorizationResultEvent: true,
        historyCleanupOff: true,
        logLevel: 'debug'
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthCustomModule {}
