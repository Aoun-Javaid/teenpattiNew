import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VimaanGameComponent } from './vimaan-game.component';

describe('AviatorGameComponent', () => {
  let component: VimaanGameComponent;
  let fixture: ComponentFixture<VimaanGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VimaanGameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VimaanGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
