import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { LayoutMessageService } from './layout-message.service';
import { AuthStore } from '@nx-post/web/shared-data-access-auth';

@Component({
  selector: 'ct-layout',
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LayoutMessageService, MessageService],
})
export class LayoutComponent implements OnInit {
  menuItems: MenuItem[] = [
    { label: 'Login', routerLink: '/login' },
    { label: 'Register', routerLink: '/register' },
  ];

  constructor(private authStore: AuthStore) {}

  ngOnInit() {
    this.authStore.init();
  }
}

@NgModule({
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  imports: [MenubarModule, RouterModule, ToastModule],
})
export class LayoutComponentModule {}
