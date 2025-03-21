import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedRulesModalComponent } from './detailed-rules-modal.component';

describe('DetailedRulesModalComponent', () => {
  let component: DetailedRulesModalComponent;
  let fixture: ComponentFixture<DetailedRulesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedRulesModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedRulesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
