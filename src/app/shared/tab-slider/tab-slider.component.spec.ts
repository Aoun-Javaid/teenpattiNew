import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSliderComponent } from './tab-slider.component';

describe('TabSliderComponent', () => {
  let component: TabSliderComponent;
  let fixture: ComponentFixture<TabSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
