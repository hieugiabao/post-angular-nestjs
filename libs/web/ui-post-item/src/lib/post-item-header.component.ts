import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { WebSharedUiAvatarModule } from '@nx-post/web/shared-ui-avatar';

@Component({
  selector: 'ct-post-item-header',
  templateUrl: './post-item-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostItemHeaderComponent {
  @Input() avatarUrl = '';
  @Input() username = '';
  @Input() name = '';
  @Input() updatedAt = new Date();
}

@NgModule({
  declarations: [PostItemHeaderComponent],
  exports: [PostItemHeaderComponent],
  imports: [CommonModule, WebSharedUiAvatarModule],
})
export class PostItemHeaderComponentModule {}
