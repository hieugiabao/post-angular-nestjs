import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent, LoginComponentModule } from './login.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    LoginComponentModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
  ],
})
export class WebFeatureLoginModule {}
