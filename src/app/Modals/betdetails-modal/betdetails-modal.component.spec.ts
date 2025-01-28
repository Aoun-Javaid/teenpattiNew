import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetdetailsModalComponent } from './betdetails-modal.component';

describe('BetdetailsModalComponent', () => {
  let component: BetdetailsModalComponent;
  let fixture: ComponentFixture<BetdetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetdetailsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetdetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
