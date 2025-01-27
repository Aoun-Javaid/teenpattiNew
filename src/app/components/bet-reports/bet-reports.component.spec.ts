import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetReportsComponent } from './bet-reports.component';

describe('BetReportsComponent', () => {
  let component: BetReportsComponent;
  let fixture: ComponentFixture<BetReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
