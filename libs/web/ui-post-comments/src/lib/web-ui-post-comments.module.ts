import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCommentsComponent } from './post-comments.component';
import { PostItemHeaderComponentModule } from '@nx-post/web/ui-post-item';
import { CardModule } from 'primeng/card';

@NgModule({
  imports: [CommonModule, CardModule, PostItemHeaderComponentModule],
  exports: [PostCommentsComponent],
  declarations: [PostCommentsComponent],
})
export class WebUiPostCommentsModule {}
