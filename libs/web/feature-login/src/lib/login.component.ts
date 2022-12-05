import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'ct-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class LoginComponentModule {}
