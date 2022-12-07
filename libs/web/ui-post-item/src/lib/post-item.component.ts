import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { PostDto } from '@nx-post/web/shared-data-access-api-sdk';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { PostItemHeaderComponentModule } from './post-item-header.component';

@Component({
  selector: 'ct-post-item[post]',
  templateUrl: './post-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostItemComponent {
  @Input() post!: PostDto;
  @Input() isLiked = false;

  @Output() like = new EventEmitter<void>();
  @Output() unlike = new EventEmitter<void>();
  @Output() comment = new EventEmitter<void>();

  @HostBinding('class')
  readonly hostClass = 'col-12 shadow-4 p-4 mb-4 p-component block';
}

@NgModule({
  declarations: [PostItemComponent],
  exports: [PostItemComponent],
  imports: [
    PostItemHeaderComponentModule,
    ButtonModule,
    CommonModule,
    RippleModule,
    TooltipModule,
  ],
})
export class PostItemComponentModule {}
