import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
  const defaultLogoWidth: number = 485;
  const nativeLogoRatio: number = 9.7;

  let fixture: ComponentFixture<LogoComponent>;
  let component: LogoComponent;
  let logoNativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoComponent ]
    });

    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    logoNativeElement = fixture.debugElement.query(By.css('.logo')).nativeElement;
  });

  it('should contain logo in normal size by default', () => {
    fixture.detectChanges();

    expect(logoNativeElement).toBeTruthy();
    expect(logoNativeElement.offsetWidth).toBe(defaultLogoWidth);
    expect(logoNativeElement.offsetHeight).toBe(50);
  });

  it('should contain logo in small size', () => {
    component.size = 'small';
    fixture.detectChanges();

    const ratio: number = (logoNativeElement.offsetWidth / logoNativeElement.offsetHeight);

    expect(logoNativeElement.offsetWidth).toBeLessThan(defaultLogoWidth);
    expect(ratio).toBeLessThan(nativeLogoRatio + 0.1);
    expect(ratio).not.toBeLessThan(nativeLogoRatio - 0.1);
  });
});
