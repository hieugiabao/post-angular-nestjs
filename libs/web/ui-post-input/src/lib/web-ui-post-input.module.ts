import { PostInputComponent } from './post-input.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PostInputComponent],
  exports: [PostInputComponent],
  imports: [
    CommonModule,
    InputTextareaModule,
    ButtonModule,
    RippleModule,
    FormsModule,
  ],
})
export class WebUiPostInputModule {}
