import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent, PostComponentModule } from './post.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    PostComponentModule,
    RouterModule.forChild([{ path: '', component: PostComponent }]),
  ],
})
export class WebFeaturePostModule {}
