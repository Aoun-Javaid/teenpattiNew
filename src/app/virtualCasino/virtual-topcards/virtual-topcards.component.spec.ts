import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualTopcardsComponent } from './virtual-topcards.component';

describe('VirtualTopcardsComponent', () => {
  let component: VirtualTopcardsComponent;
  let fixture: ComponentFixture<VirtualTopcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualTopcardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualTopcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
