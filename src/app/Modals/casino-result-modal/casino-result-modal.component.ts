import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-casino-result-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './casino-result-modal.component.html',
  styleUrl: './casino-result-modal.component.css'
})
export class CasinoResultModalComponent {
  @Output() dataSent = new EventEmitter<string>();

  isShow: boolean = false
  selectedResult:any={}
  subscription: any;
  exposurePassword: boolean = false;
  isLoading = false;
  constructor(
    private modalService: ModalService,
    private networkService: NetworkService,) { }

  ngOnInit(): void {
    this.subscription = this.modalService.getCasinoResulttModal().subscribe((value: any) => {
      if(value.show){
        this.selectedResult = value;
        this.isShow = value.show;
      }
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
