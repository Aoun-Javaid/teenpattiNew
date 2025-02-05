import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopResultsComponent } from './top-results.component';

describe('TopResultsComponent', () => {
  let component: TopResultsComponent;
  let fixture: ComponentFixture<TopResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
