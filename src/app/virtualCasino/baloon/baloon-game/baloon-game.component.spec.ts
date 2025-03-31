import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaloonGameComponent } from './baloon-game.component';

describe('BaloonGameComponent', () => {
  let component: BaloonGameComponent;
  let fixture: ComponentFixture<BaloonGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaloonGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaloonGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
