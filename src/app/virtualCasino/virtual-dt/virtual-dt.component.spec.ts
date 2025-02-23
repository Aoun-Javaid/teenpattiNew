import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualDtComponent } from './virtual-dt.component';

describe('VirtualDtComponent', () => {
  let component: VirtualDtComponent;
  let fixture: ComponentFixture<VirtualDtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualDtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualDtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
