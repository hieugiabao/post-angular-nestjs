import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'ct-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {}

@NgModule({
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
})
export class RegisterComponentModule {}
