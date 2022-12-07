import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { UserInfomationDto } from '@nx-post/web/shared-data-access-api-sdk';
import { filter, tap } from 'rxjs';

export interface AuthState {
  token?: string;
  user?: UserInfomationDto;
}

@Injectable({
  providedIn: 'root',
})
export class AuthStore extends ComponentStore<AuthState> {
  readonly token$ = this.select((state) => state.token).pipe(
    filter((token) => token !== undefined)
  );
  readonly user$ = this.select((state) => state.user);
  readonly isAuthenticated$ = this.select(this.token$, (token) => !!token);

  constructor() {
    super({});
  }

  private readonly storeLocal = this.effect<AuthState>(
    tap(({ user, token }) => {
      if (!token) {
        localStorage.clear();
      } else {
        localStorage.setItem('access_token', token);
        localStorage.setItem('user', JSON.stringify(user));
      }
    })
  );

  init() {
    const token = localStorage.getItem('access_token') || '';
    if (token) {
      const stringifiedUser = localStorage.getItem('user');
      this.setState({
        token,
        user: stringifiedUser ? JSON.parse(stringifiedUser) : undefined,
      });
    } else {
      this.setState({ token: '' });
    }
    this.storeLocal(this.state$);
  }
}
