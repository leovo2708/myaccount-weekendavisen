import { Injectable } from '@angular/core';

@Injectable()
export class WindowRef {
  private _window: Window = window;

  redirectTo(newLocation: string): void {
    this._window.location.href = newLocation;
  }
}
