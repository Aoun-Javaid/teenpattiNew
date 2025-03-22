import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeBetComponent } from './free-bet.component';

describe('FreeBetComponent', () => {
  let component: FreeBetComponent;
  let fixture: ComponentFixture<FreeBetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeBetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
