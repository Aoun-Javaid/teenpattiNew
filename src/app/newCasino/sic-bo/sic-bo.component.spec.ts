import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SicBoComponent } from './sic-bo.component';

describe('SicBoComponent', () => {
  let component: SicBoComponent;
  let fixture: ComponentFixture<SicBoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SicBoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SicBoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
