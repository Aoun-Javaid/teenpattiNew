import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VtdPhaserComponent } from './vtd-phaser.component';

describe('VtdPhaserComponent', () => {
  let component: VtdPhaserComponent;
  let fixture: ComponentFixture<VtdPhaserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VtdPhaserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VtdPhaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
