import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-chat-rules-modal',
  standalone: true,
  imports: [NgIf,FormsModule],
  templateUrl: './chat-rules-modal.component.html',
  styleUrl: './chat-rules-modal.component.css'
})
export class ChatRulesModalComponent {
  @Output() dataSent = new EventEmitter<string>();

  isShow: boolean = false

  subscription: any;
  exposurePassword: boolean = false;
  isLoading = false;
  constructor(
    private modalService: ModalService,) { }

  ngOnInit(): void {
    this.subscription = this.modalService.getChatRulesModal().subscribe((value: any) => {
      this.isShow = value.show;
    })
  }
  ngOnDestroy(): void {
    this.isShow = false;

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleExposure() {
    this.isShow = false;
  }
  toggleExposurePasswordVisibility() {
    this.exposurePassword = !this.exposurePassword;
  }


}
