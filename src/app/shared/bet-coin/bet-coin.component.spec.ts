import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetCoinComponent } from './bet-coin.component';

describe('BetCoinComponent', () => {
  let component: BetCoinComponent;
  let fixture: ComponentFixture<BetCoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetCoinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
