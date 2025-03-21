import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBetHistoryComponent } from './my-bet-history.component';

describe('MyBetHistoryComponent', () => {
  let component: MyBetHistoryComponent;
  let fixture: ComponentFixture<MyBetHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyBetHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBetHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
