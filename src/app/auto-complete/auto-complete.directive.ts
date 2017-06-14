import {
  ComponentFactory, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, HostListener, Input, OnChanges, OnDestroy, OnInit,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import { AutoCompleteComponent } from './auto-complete.component';
import { Subject } from 'rxjs/Subject';
import { NgControl } from '@angular/forms';
import { DomUtilService } from '../common/dom-util.service';

@Directive({
  selector: '[appAutoComplete]'
})
export class AutoCompleteDirective implements OnChanges, OnInit, OnDestroy {
  @Input() items: string[] = [];

  component: AutoCompleteComponent;
  componentRef: ComponentRef<AutoCompleteComponent>;
  windowSubject: Subject<Event> = new Subject();

  constructor(private cfr: ComponentFactoryResolver,
              private domUtilService: DomUtilService,
              private elementRef: ElementRef,
              private ngControl: NgControl,
              private viewContainerRef: ViewContainerRef) {
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(event: Event): void {
    this.component.updatePredicate((event.target as HTMLInputElement).value);
  }

  @HostListener('focus', ['$event'])
  onFocus(event: Event): void {
    this.component.show();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const nativeInputElement: HTMLElement = this.elementRef.nativeElement;
    const nativeAutoCompleteElement: HTMLElement = this.component.clientElement;
    const clickedElement: HTMLElement = event.target as HTMLElement;

    if (nativeInputElement !== clickedElement && !this.domUtilService.getClosestElement(clickedElement, nativeAutoCompleteElement)) {
      this.component.hide();
    }
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onWindowResize(event: Event): void {
    this.windowSubject.next(event);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.component) {
      this.component.items.next(changes.items.currentValue);
    }
  }

  ngOnInit(): void {
    const factory: ComponentFactory<AutoCompleteComponent> = this.cfr.resolveComponentFactory(AutoCompleteComponent);
    this.componentRef = this.viewContainerRef.createComponent(factory);
    this.component = this.componentRef.instance;
    this.component.clientElement = this.viewContainerRef.element.nativeElement;
    this.component.items.next(this.items);

    this.component.onSelect.subscribe((item: string) => {
      this.ngControl.control.patchValue(item);
    });

    this.windowSubject
      .debounceTime(300)
      .subscribe(() => {
        this.component.repositionElement();
      });
  }

  ngOnDestroy(): void {
    this.componentRef.destroy();
    this.windowSubject.complete();
  }
}
