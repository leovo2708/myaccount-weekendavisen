import { Directive, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[appFormControlError]'
})
export class FormControlErrorDirective implements OnDestroy, OnInit {
  statusSubscription: Subscription;

  constructor(private elementRef: ElementRef,
              private ngControl: NgControl) {
  }

  @HostListener('blur') onBlur(): void {
    this.toggleClass();
  }

  ngOnDestroy(): void {
    this.statusSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.statusSubscription = this.ngControl.statusChanges.subscribe(() => {
      this.toggleClass();
    });
  }

  toggleClass(): void {
    if (this.ngControl.touched && this.ngControl.invalid) {
      this.elementRef.nativeElement.classList.add('warn');
    } else {
      this.elementRef.nativeElement.classList.remove('warn');
    }
  }
}
