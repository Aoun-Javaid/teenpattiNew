import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSeedModalComponent } from './change-seed-modal.component';

describe('ChangeSeedModalComponent', () => {
  let component: ChangeSeedModalComponent;
  let fixture: ComponentFixture<ChangeSeedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeSeedModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeSeedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
