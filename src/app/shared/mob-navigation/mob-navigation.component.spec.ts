import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobNavigationComponent } from './mob-navigation.component';

describe('MobNavigationComponent', () => {
  let component: MobNavigationComponent;
  let fixture: ComponentFixture<MobNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
