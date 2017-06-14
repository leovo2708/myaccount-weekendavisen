import { Injectable } from '@angular/core';

@Injectable()
export class DomUtilService {
  getClosestElement(element: HTMLElement, elementToFind: HTMLElement): HTMLElement {
    let currentElement: HTMLElement = element;

    do {
      if (currentElement === elementToFind) {
        return elementToFind;
      }

      currentElement = currentElement.parentElement;
    }
    while (currentElement);

    return null;
  }
}
