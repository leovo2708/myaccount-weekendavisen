import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-control-message',
  templateUrl: './form-control-message.component.html',
  styleUrls: ['./form-control-message.component.scss']
})
export class FormControlMessageComponent {
  @Input() type: string = 'info';
}
