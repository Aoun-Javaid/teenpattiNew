import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutplayOptionsComponent } from './autplay-options.component';

describe('AutplayOptionsComponent', () => {
  let component: AutplayOptionsComponent;
  let fixture: ComponentFixture<AutplayOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutplayOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutplayOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
