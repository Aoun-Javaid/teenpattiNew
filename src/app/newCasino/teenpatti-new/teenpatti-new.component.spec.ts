import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeenpattiNewComponent } from './teenpatti-new.component';

describe('TeenpattiNewComponent', () => {
  let component: TeenpattiNewComponent;
  let fixture: ComponentFixture<TeenpattiNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeenpattiNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeenpattiNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
