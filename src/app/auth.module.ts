// src/app/auth/auth.module.ts

import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority:
          'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_fX0foj6hs',
        redirectUrl: window.location.origin + '/oauth2/idpresponse',
        clientId: '5td15o52te3e32nir868jih1j7',
        scope: 'email openid phone profile',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        ignoreNonceAfterRefresh: true,
        maxIdTokenIatOffsetAllowedInSeconds: 600,
        issValidationOff: false,
        autoUserInfo: false,
        customParamsAuthRequest: {
          prompt: 'consent',
        },
      },
    }),
  ],
})
export class AuthCustomModule {}
