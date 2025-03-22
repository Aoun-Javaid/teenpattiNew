import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvablyFairModalComponent } from './provably-fair-modal.component';

describe('ProvablyFairModalComponent', () => {
  let component: ProvablyFairModalComponent;
  let fixture: ComponentFixture<ProvablyFairModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvablyFairModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvablyFairModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
