import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-check-icon',
  templateUrl: './check-icon.component.html',
  styleUrls: ['./check-icon.component.scss']
})
export class CheckIconComponent {
  @Input() color: 'default' | 'light' = 'default';
  @Input() size: 'normal' | 'small' = 'normal';
}
