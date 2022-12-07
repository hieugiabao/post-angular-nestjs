import { RouterModule } from '@angular/router';
import { LayoutComponent, LayoutComponentModule } from './layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  AuthGuard,
  authInterceptorProvider,
} from '@nx-post/web/shared-data-access-auth';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    LayoutComponentModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LayoutComponent,
        children: [
          {
            path: '',
            redirectTo: 'posts',
            pathMatch: 'full',
          },
          {
            path: 'posts',
            canLoad: [AuthGuard],
            loadChildren: async () =>
              (await import('@nx-post/web/feature-posts'))
                .WebFeaturePostsModule,
          },
          {
            path: 'login',
            loadChildren: async () =>
              (await import('@nx-post/web/feature-login'))
                .WebFeatureLoginModule,
          },
          {
            path: 'register',
            loadChildren: async () =>
              (await import('@nx-post/web/feature-register'))
                .WebFeatureRegisterModule,
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
  providers: [authInterceptorProvider],
})
export class WebFeatureShellModule {}
