import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobSidebarComponent } from './mob-sidebar.component';

describe('MobSidebarComponent', () => {
  let component: MobSidebarComponent;
  let fixture: ComponentFixture<MobSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
