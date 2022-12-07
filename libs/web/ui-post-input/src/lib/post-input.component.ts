import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'ct-post-input',
  templateUrl: './post-input.component.html',
  styles: [
    `
      textarea::placeholder {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
          'Segoe UI Symbol';
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostInputComponent {
  newPost = '';

  @Output() postSubmit = new EventEmitter<string>();

  onSubmit() {
    if (!this.newPost) return;

    this.postSubmit.emit(this.newPost);
    this.newPost = '';
  }
}
