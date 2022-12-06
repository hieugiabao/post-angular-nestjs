import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginParamsDto } from '@nx-post/web/shared-data-access-api-sdk';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { LoginStore } from './login.store';

@Component({
  selector: 'ct-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoginStore],
})
export class LoginComponent {
  constructor(private loginStore: LoginStore) {}

  loginDto: LoginParamsDto = {
    username: '',
    password: '',
  };

  onSubmit(loginForm: NgForm) {
    this.loginStore.login(this.loginDto);
    this.loginDto = { username: '', password: '' };
    loginForm.reset(this.loginDto);
  }
}

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  imports: [
    FormsModule,
    RouterModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    CommonModule,
  ],
})
export class LoginComponentModule {}
