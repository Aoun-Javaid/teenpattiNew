import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniverseOriginalsComponent } from './universe-originals.component';

describe('UniverseOriginalsComponent', () => {
  let component: UniverseOriginalsComponent;
  let fixture: ComponentFixture<UniverseOriginalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniverseOriginalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniverseOriginalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
