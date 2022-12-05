import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RegisterComponent,
  RegisterComponentModule,
} from './register.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RegisterComponentModule,
    RouterModule.forChild([{ path: '', component: RegisterComponent }]),
  ],
})
export class WebFeatureRegisterModule {}
