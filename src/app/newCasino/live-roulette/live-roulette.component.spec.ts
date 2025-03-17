import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveRouletteComponent } from './live-roulette.component';

describe('LiveRouletteComponent', () => {
  let component: LiveRouletteComponent;
  let fixture: ComponentFixture<LiveRouletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveRouletteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveRouletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
