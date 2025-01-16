
import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'https://us-east-2fx0foj6hs.auth.us-east-2.amazoncognito.com',
        redirectUrl: window.location.origin,
        clientId: '5td15o52te3e32nir868jih1j7',
        scope: 'email openid phone profile',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        ignoreNonceAfterRefresh: true,
        maxIdTokenIatOffsetAllowedInSeconds: 600,
        issValidationOff: true,
        autoUserInfo: true,
        secureRoutes: [],
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
