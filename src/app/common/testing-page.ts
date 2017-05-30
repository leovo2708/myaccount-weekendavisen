import { DebugElement, NgModule, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

export abstract class TestingPage<T> {
  fixture: ComponentFixture<T>;
  component: T;
  debugElement: DebugElement;

  constructor(component: Type<T>, moduleConfig: NgModule) {
    TestBed.configureTestingModule(moduleConfig);
    this.fixture = TestBed.createComponent(component) as ComponentFixture<T>;
    this.component = this.fixture.componentInstance;
    this.debugElement = this.fixture.debugElement;

    this.initStubs();
    this.initSpies();
  }

  abstract initSpies(): void;
  abstract initStubs(): void;
}
