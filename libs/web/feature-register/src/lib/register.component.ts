import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterParamsDto } from '@nx-post/web/shared-data-access-api-sdk';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { RegisterStore } from './register.store';

@Component({
  selector: 'ct-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RegisterStore],
})
export class RegisterComponent {
  registerDto: RegisterParamsDto = {
    email: '',
    password: '',
    username: '',
    avatarUrl: '',
    name: '',
    location: '',
  };

  constructor(private registerStore: RegisterStore) {}

  onSubmit(registerForm: NgForm) {
    this.registerStore.register(this.registerDto);
    this.registerDto = {
      username: '',
      password: '',
      email: '',
      avatarUrl: '',
      name: '',
      location: '',
    };
    registerForm.reset(this.registerDto);
  }
}

@NgModule({
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
  imports: [
    FormsModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    RouterModule,
  ],
})
export class RegisterComponentModule {}
