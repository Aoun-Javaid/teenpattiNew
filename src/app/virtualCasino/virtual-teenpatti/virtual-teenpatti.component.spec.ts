import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualTeenpattiComponent } from './virtual-teenpatti.component';

describe('VirtualTeenpattiComponent', () => {
  let component: VirtualTeenpattiComponent;
  let fixture: ComponentFixture<VirtualTeenpattiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualTeenpattiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualTeenpattiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
