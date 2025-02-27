import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualDragonComponent } from './virtual-dragon.component';

describe('VirtualDragonComponent', () => {
  let component: VirtualDragonComponent;
  let fixture: ComponentFixture<VirtualDragonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualDragonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualDragonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
