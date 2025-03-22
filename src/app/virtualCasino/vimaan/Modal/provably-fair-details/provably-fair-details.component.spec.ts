import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvablyFairDetailsComponent } from './provably-fair-details.component';

describe('ProvablyFairDetailsComponent', () => {
  let component: ProvablyFairDetailsComponent;
  let fixture: ComponentFixture<ProvablyFairDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvablyFairDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvablyFairDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
