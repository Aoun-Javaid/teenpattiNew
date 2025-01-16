import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRulesModalComponent } from './chat-rules-modal.component';

describe('ChatRulesModalComponent', () => {
  let component: ChatRulesModalComponent;
  let fixture: ComponentFixture<ChatRulesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatRulesModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatRulesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
