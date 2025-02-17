import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveBaccaratComponent } from './live-baccarat.component';

describe('LiveBaccaratComponent', () => {
  let component: LiveBaccaratComponent;
  let fixture: ComponentFixture<LiveBaccaratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveBaccaratComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveBaccaratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
