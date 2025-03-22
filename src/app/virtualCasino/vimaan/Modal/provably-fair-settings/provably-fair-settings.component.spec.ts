import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvablyFairSettingsComponent } from './provably-fair-settings.component';

describe('ProvablyFairSettingsComponent', () => {
  let component: ProvablyFairSettingsComponent;
  let fixture: ComponentFixture<ProvablyFairSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvablyFairSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvablyFairSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
