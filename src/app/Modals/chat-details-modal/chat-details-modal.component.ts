import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-chat-details-modal',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './chat-details-modal.component.html',
  styleUrl: './chat-details-modal.component.css'
})
export class ChatDetailsModalComponent {
  @Output() dataSent = new EventEmitter<string>();

  isShow: boolean = false
  userName:any='';
  room:any='general';
  subscription: any;
  exposurePassword: boolean = false;
  isLoading = false;
  constructor(
    private modalService: ModalService,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.subscription = this.modalService.getChatDetailsModal().subscribe((value: any) => {
      this.isShow = value.show;
      setTimeout(() => {
        const input = document.getElementById('chat_username') as HTMLInputElement | null;
        if (input) {
          input.focus();
        }
      }, 100);

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
  submitDetails(){
    if(this.userName==''){
      this.toaster.error('username required!','',{});
      return
    }
    if(this.room==''){
      this.toaster.error('room required!','',{})
      return
    }

    let data:any = {
      "username":this.userName,
      "room":this.room
    }
    this.dataSent.emit(data);

    this.isShow = false;
  }

}
