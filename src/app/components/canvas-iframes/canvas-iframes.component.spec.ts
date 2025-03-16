import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasIframesComponent } from './canvas-iframes.component';

describe('CanvasIframesComponent', () => {
  let component: CanvasIframesComponent;
  let fixture: ComponentFixture<CanvasIframesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanvasIframesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasIframesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
