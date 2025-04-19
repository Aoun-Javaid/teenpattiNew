import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDetailsModalComponent } from './chat-details-modal.component';

describe('ChatDetailsModalComponent', () => {
  let component: ChatDetailsModalComponent;
  let fixture: ComponentFixture<ChatDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatDetailsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
