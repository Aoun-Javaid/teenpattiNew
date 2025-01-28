import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetStakesComponent } from './bet-stakes.component';

describe('BetStakesComponent', () => {
  let component: BetStakesComponent;
  let fixture: ComponentFixture<BetStakesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetStakesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetStakesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
