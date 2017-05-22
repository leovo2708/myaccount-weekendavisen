import { Component, ViewEncapsulation } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss', '../styles/' + environment.brand + '.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}
