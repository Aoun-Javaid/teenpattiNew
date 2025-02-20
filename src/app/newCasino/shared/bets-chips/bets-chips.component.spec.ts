import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetsChipsComponent } from './bets-chips.component';

describe('BetsChipsComponent', () => {
  let component: BetsChipsComponent;
  let fixture: ComponentFixture<BetsChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetsChipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BetsChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
