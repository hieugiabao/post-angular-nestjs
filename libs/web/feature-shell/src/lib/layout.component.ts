import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutMessageService } from '@nx-post/web/data-access-shell';
import { MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { LayoutStore } from './layout.store';

@Component({
  selector: 'ct-layout',
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LayoutMessageService, MessageService, LayoutStore],
})
export class LayoutComponent implements OnInit {
  readonly vm$ = this.layoutStore.vm$;

  constructor(private layoutStore: LayoutStore) {}

  ngOnInit() {
    this.layoutStore.init();
  }
}

@NgModule({
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  imports: [MenubarModule, RouterModule, ToastModule, CommonModule],
})
export class LayoutComponentModule {}
