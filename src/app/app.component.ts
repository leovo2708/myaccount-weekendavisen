import { Component, ViewEncapsulation } from '@angular/core';
import { environment } from '../environments/environment';

const brand: string = environment.brand;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss', '../styles/brand/_' + brand + '.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}
