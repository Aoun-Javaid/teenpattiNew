import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerstatusMComponent } from './playerstatus-m.component';

describe('PlayerstatusMComponent', () => {
  let component: PlayerstatusMComponent;
  let fixture: ComponentFixture<PlayerstatusMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerstatusMComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerstatusMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
