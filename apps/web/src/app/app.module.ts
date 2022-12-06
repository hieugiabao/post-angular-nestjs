import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WebFeatureShellModule } from '@nx-post/web/feature-shell';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { API_BASE_URL } from '@nx-post/web/shared-data-access-api-sdk';
import { environment } from '../enviroments/enviroment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, WebFeatureShellModule],
  providers: [{ provide: API_BASE_URL, useValue: environment.apiBaseUrl }],
  bootstrap: [AppComponent],
})
export class AppModule {}
