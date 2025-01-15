// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthCustomModule } from './auth.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, AuthCustomModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
