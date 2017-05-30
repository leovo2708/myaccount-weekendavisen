import { Component } from '@angular/core';

export function generateComponent(options: Component): Component {
  const metadata: Component = {
    selector: options.selector,
    template: options.template || '<ng-content></ng-content>',
    inputs: options.inputs,
    outputs: options.outputs,
    exportAs: options.exportAs
  };

  return Component(metadata)(class _ {});
}
