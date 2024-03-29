import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import {
  PostControllerService,
  PostDto,
} from '@nx-post/web/shared-data-access-api-sdk';
import { AuthStore } from '@nx-post/web/shared-data-access-auth';
import {
  concatMap,
  map,
  Observable,
  pipe,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';

export interface PostsState {
  posts: PostDto[];
}

@Injectable()
export class PostsStore extends ComponentStore<PostsState> {
  readonly posts$ = this.select((state) => state.posts);

  readonly likedByMe$ = this.select(
    this.posts$,
    this.authStore.user$,
    (posts, user) =>
      posts.reduce<Record<string, boolean>>((record, { likedBy, id }) => {
        record[id] =
          !!user && likedBy.some((likedPost) => likedPost.id === user.id);
        return record;
      }, {})
  );

  readonly vm$: Observable<{
    posts: PostDto[];
    likedByMe: Record<string, boolean>;
  }> = this.select(
    this.posts$,
    this.likedByMe$,
    (posts, likedByMe) => ({ posts, likedByMe }),
    { debounce: true }
  );

  constructor(
    private postControllerService: PostControllerService,
    private authStore: AuthStore,
    private router: Router
  ) {
    super({ posts: [] });
  }

  readonly getAll = this.effect<void>(
    switchMap(() =>
      this.postControllerService.get().pipe(
        tap({
          next: (posts) => {
            this.patchState({ posts });
          },
          error: console.log,
        })
      )
    )
  );

  readonly create = this.effect<string>(
    concatMap((text) =>
      this.postControllerService.create({ text }).pipe(
        tap({
          next: (newPost) => {
            this.patchState((state) => ({ posts: [newPost, ...state.posts] }));
          },
          error: console.log,
        })
      )
    )
  );

  readonly like = this.effect<string>(
    concatMap((postId) =>
      this.postControllerService
        .like(postId)
        .pipe(
          withLatestFrom(this.authStore.user$),
          map(([post, user]) => {
            post.likedByCount++;
            user && post.likedBy.push(user);
            return post;
          })
        )
        .pipe(this.updatePostInplace())
    )
  );

  readonly unlike = this.effect<string>(
    concatMap((postId) =>
      this.postControllerService
        .unlike(postId)
        .pipe(
          withLatestFrom(this.authStore.user$),
          map(([post, user]) => {
            post.likedByCount--;
            user &&
              (post.likedBy = post.likedBy.filter(
                (userPost) => userPost.id !== user.id
              ));
            return post;
          })
        )
        .pipe(this.updatePostInplace())
    )
  );

  readonly gotoPost = this.effect<string>(
    tap((postId) => {
      void this.router.navigate(['/posts', postId]);
    })
  );

  private readonly updatePostInplace = () => {
    return pipe(
      tap<PostDto>((updated) => {
        this.patchState((state) => ({
          posts: state.posts.map((post) => {
            return post.id === updated.id ? updated : post;
          }),
        }));
      })
    );
  };
}
