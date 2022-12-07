import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit,
} from '@angular/core';
import { WebUiPostInputModule } from '@nx-post/web/ui-post-input';
import { PostItemComponentModule } from '@nx-post/web/ui-post-item';
import { PostsStore } from './posts.store';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'ct-posts',
  templateUrl: './posts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PostsStore],
})
export class PostsComponent implements OnInit {
  readonly vm$ = this.postsStore.vm$;

  constructor(private postsStore: PostsStore) {}

  ngOnInit() {
    this.postsStore.getAll();
  }

  onLike(id: string) {
    this.postsStore.like(id);
  }

  onUnlike(id: string) {
    this.postsStore.unlike(id);
  }

  onComment(id: string) {
    this.postsStore.gotoPost(id);
  }

  onPostSubmit(text: string) {
    this.postsStore.create(text);
  }
}

@NgModule({
  declarations: [PostsComponent],
  exports: [PostsComponent],
  imports: [
    CommonModule,
    DataViewModule,
    PostItemComponentModule,
    WebUiPostInputModule,
  ],
})
export class PostsComponentModule {}
