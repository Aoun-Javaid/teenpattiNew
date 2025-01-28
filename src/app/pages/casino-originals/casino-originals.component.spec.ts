import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasinoOriginalsComponent } from './casino-originals.component';

describe('CasinoOriginalsComponent', () => {
  let component: CasinoOriginalsComponent;
  let fixture: ComponentFixture<CasinoOriginalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasinoOriginalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasinoOriginalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
