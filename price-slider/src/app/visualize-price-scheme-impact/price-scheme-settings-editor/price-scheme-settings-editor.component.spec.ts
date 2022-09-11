import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceSchemeSettingsEditorComponent } from './price-scheme-settings-editor.component';

describe('PriceSchemeSettingsEditorComponent', () => {
  let component: PriceSchemeSettingsEditorComponent;
  let fixture: ComponentFixture<PriceSchemeSettingsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceSchemeSettingsEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceSchemeSettingsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
