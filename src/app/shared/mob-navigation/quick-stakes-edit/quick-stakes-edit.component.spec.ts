import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickStakesEditComponent } from './quick-stakes-edit.component';

describe('QuickStakesEditComponent', () => {
  let component: QuickStakesEditComponent;
  let fixture: ComponentFixture<QuickStakesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickStakesEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickStakesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
