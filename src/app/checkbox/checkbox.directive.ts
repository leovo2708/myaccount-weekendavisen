import { ComponentFactoryResolver, ComponentRef, Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { CheckboxContainerComponent } from './checkbox-container.component';

@Directive({
  selector: '[appCheckbox]'
})
export class CheckboxDirective implements OnInit, OnDestroy {
  containerRef: ComponentRef<CheckboxContainerComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.containerRef = this.viewContainer.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(CheckboxContainerComponent)
    );

    this.containerRef.instance.appendInput(this.templateRef);
  }

  ngOnDestroy(): void {
    this.containerRef.destroy();
  }
}
