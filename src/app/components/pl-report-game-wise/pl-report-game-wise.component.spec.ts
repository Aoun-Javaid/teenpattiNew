import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlReportGameWiseComponent } from './pl-report-game-wise.component';

describe('PlReportGameWiseComponent', () => {
  let component: PlReportGameWiseComponent;
  let fixture: ComponentFixture<PlReportGameWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlReportGameWiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlReportGameWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
