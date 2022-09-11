import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceSchemeSlidersComponent } from './price-scheme-sliders.component';

describe('PriceSchemeSlidersComponent', () => {
  let component: PriceSchemeSlidersComponent;
  let fixture: ComponentFixture<PriceSchemeSlidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceSchemeSlidersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceSchemeSlidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
