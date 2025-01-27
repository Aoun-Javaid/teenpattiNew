import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlReportUserWiseComponent } from './pl-report-user-wise.component';

describe('PlReportUserWiseComponent', () => {
  let component: PlReportUserWiseComponent;
  let fixture: ComponentFixture<PlReportUserWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlReportUserWiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlReportUserWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
