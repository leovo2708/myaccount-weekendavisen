import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/combineLatest';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit, OnDestroy {
  @Output() onSelect: EventEmitter<string> = new EventEmitter();

  clientElement: HTMLElement;
  clientRect: ClientRect;
  combinedItems: Subscription;
  combinedVisibility: Subscription;
  filteredItems: Observable<string[]>;
  isVisible: Observable<boolean>;
  items: Subject<string[]> = new Subject();
  positionStyles: any;
  predicate: Subject<string> = new Subject();
  visible: Subject<boolean> = new Subject();
  visibleSubscription: Subscription;

  hide(): void {
    this.visible.next(false);
  }

  show(): void {
    this.visible.next(true);
  }

  ngOnInit(): void {
    this.filteredItems = Observable.combineLatest([
      this.items.asObservable(),
      this.predicate.asObservable().map((predicate: string) => predicate.toLowerCase())
    ]).map(([items, predicate]: any[]) => {
      if (!predicate || !items) {
        return [];
      }

      return items.filter((item: string) => item.toLowerCase().indexOf(predicate) === 0);
    });

    this.isVisible = Observable.combineLatest([
      this.filteredItems,
      this.visible.asObservable()
    ]).map(([filteredItems, visible]: any[]) => {
      return visible && filteredItems.length;
    });

    this.visibleSubscription = this.visible.subscribe((visible: boolean) => {
      if (visible) {
        this.repositionElement();
      }
    });

    this.combinedVisibility = this.isVisible.subscribe((visible: boolean) => {
      if (visible) {
        this.clientElement.classList.add('app-auto-complete');
      } else {
        this.clientElement.classList.remove('app-auto-complete');
      }
    });

    this.combinedItems = this.filteredItems.subscribe();
  }

  ngOnDestroy(): void {
    this.combinedItems.unsubscribe();
    this.combinedVisibility.unsubscribe();
    this.items.complete();
    this.predicate.complete();
    this.visibleSubscription.unsubscribe();
  }

  repositionElement(): void {
    if (this.clientElement) {
      this.clientRect = this.clientElement.getBoundingClientRect();
    }

    this.positionStyles = {
      left: `${this.clientRect.left}px`,
      top: `${this.clientRect.bottom}px`,
      width: `${this.clientRect.width}px`
    }
  }

  selectItem(item: string): void {
    this.onSelect.emit(item);
    this.hide();
    this.clientElement.focus();
  }

  updatePredicate(newPredicate: string): void {
    this.predicate.next(newPredicate);
  }
}
