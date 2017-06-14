import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { DomUtilService } from '../common/dom-util.service';

const modules: any[] = [
  BrowserAnimationsModule,
  BrowserModule,
  CommonModule,
  ReactiveFormsModule,
  HttpModule,
  RouterModule
];

@NgModule({
  imports: modules,
  exports: modules,
  providers: [
    DomUtilService,
    JwtHelper
  ]
})
export class SharedModule { }
