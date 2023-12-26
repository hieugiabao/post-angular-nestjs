import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { CommentDto } from '@nx-post/web/shared-data-access-api-sdk';

@Component({
  selector: 'ct-post-comments',
  template: `
    <p-card *ngFor="let comment of comments" styleClass="mb-2">
      <ct-post-item-header
        [updatedAt]="comment.updatedAt"
        [username]="comment.author.name ?? ''"
        [username]="comment.author.username"
        [avatarUrl]="comment.author.avatarUrl ?? ''"
      ></ct-post-item-header>
      <p>{{ comment.text }}</p>
    </p-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCommentsComponent {
  @Input() comments: CommentDto[] = [];

  @HostBinding('class') readonly hostClass = 'mb-4 block';
}
