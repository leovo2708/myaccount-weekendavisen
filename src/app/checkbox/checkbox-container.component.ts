import { Component, ComponentRef, OnDestroy, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-checkbox-container',
  templateUrl: './checkbox-container.component.html',
  styleUrls: ['./checkbox-container.component.scss']
})
export class CheckboxContainerComponent implements OnDestroy {
  @ViewChild('inputContainer', {read: ViewContainerRef}) container: ViewContainerRef;
  componentRef: ComponentRef<any>;

  appendInput(inputComponent: TemplateRef<any>): void {
    this.container.clear();
    this.container.createEmbeddedView(inputComponent);
  }

  ngOnDestroy(): void {
    this.componentRef.destroy();
  }
}
