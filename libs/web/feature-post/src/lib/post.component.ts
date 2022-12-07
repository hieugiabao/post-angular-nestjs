import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'ct-post',
  templateUrl: './post.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {}

@NgModule({
  declarations: [PostComponent],
  exports: [PostComponent],
})
export class PostComponentModule {}
