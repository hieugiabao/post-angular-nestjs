import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';
import { PostStore } from './post.store';
import { CommonModule } from '@angular/common';
import { WebUiPostCommentsModule } from '@nx-post/web/ui-post-comments';
import { WebUiPostInputModule } from '@nx-post/web/ui-post-input';
import { PostItemComponentModule } from '@nx-post/web/ui-post-item';

@Component({
  selector: 'ct-post',
  templateUrl: './post.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PostStore],
})
export class PostComponent implements OnInit {
  readonly post$ = this.postStore.post$;

  constructor(private postStore: PostStore) {}

  ngOnInit(): void {
    this.postStore.init();
  }

  onSubmit(text: string, id: string) {
    this.postStore.comment({ text, postId: id });
  }

  onLike(id: string) {
    this.postStore.like(id);
  }

  onUnlike(id: string) {
    this.postStore.unlike(id);
  }
}

@NgModule({
  declarations: [PostComponent],
  exports: [PostComponent],
  imports: [
    CommonModule,
    PostItemComponentModule,
    WebUiPostCommentsModule,
    WebUiPostInputModule,
  ],
})
export class PostComponentModule {}
