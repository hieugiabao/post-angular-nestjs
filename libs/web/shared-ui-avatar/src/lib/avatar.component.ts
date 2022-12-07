import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'ct-avatar',
  templateUrl: './avatar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input() avatar?: string;

  @HostBinding('class')
  readonly hostClass = `flex align-item-center justify-content-center w-3rem h-3rem border-2 border-300 border-circle`;
}
