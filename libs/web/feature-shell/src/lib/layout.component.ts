import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'ct-layout',
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  menuItems: MenuItem[] = [
    { label: 'Login', routerLink: '/login' },
    { label: 'Register', routerLink: '/register' },
  ];
}

@NgModule({
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  imports: [MenubarModule, RouterModule],
})
export class LayoutComponentModule {}
