import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutMessageService } from '@nx-post/web/data-access-shell';
import { MenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'ct-layout',
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LayoutMessageService, MessageService],
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
  imports: [MenubarModule, RouterModule, ToastModule],
})
export class LayoutComponentModule {}
