import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-betdetails-modal',
  standalone: true,
  imports: [NgIf,FormsModule],
  templateUrl: './betdetails-modal.component.html',
  styleUrl: './betdetails-modal.component.css'
})
export class BetdetailsModalComponent {
  @Output() dataSent = new EventEmitter<string>();

  isShow: boolean = false

  subscription: any;
  exposurePassword: boolean = false;
  isLoading = false;
  constructor(
    private modalService: ModalService,
    private networkService: NetworkService,) { }

  ngOnInit(): void {
    this.subscription = this.modalService.getBetsDetailModals().subscribe((value: any) => {

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

  CreditOrExposureLimit() {
    this.isLoading = true; // Show spinner

    // let req = {
    //   "commission": this.userInfo.commission,
    //   "password": this.userInfo.masterPassword,
    //   "userId": this.userInfo._id
    // }
    // this.networkService.getAllRecordsByPost(CONFIG.updateUserMatchOddsCommission, req)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.isLoading = false;
    //       this.isShow = false;
    //       this.dataSent.emit('');
    //       data.masterPassword = '';
    //       this.toaster.success(data.meta.message, '', {
    //         closeButton: true,
    //         toastClass: 'ngx-toastr custom-toast success',
    //         timeOut: 2000,
    //         progressBar: true
    //       });


    //     },
    //     error => {
    //       let responseData = error.error;
    //       this.networkService.ErrorNotification_Manager(responseData);
    //     });
  }
}
