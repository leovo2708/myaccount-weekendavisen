import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

const modules: any[] = [
  BrowserAnimationsModule,
  BrowserModule,
  CommonModule,
  FormsModule,
  RouterModule
];

@NgModule({
  imports: modules,
  exports: modules,
  providers: [
    JwtHelper
  ]
})
export class SharedModule { }
