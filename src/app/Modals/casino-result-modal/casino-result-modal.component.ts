import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Input() darkTheme: boolean = false;
  @Input() extraMarkets: boolean = true;

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
        // console.log('selected result',this.selectedResult)
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
    this.selectedResult=null;
  }
  toggleExposurePasswordVisibility() {
    this.exposurePassword = !this.exposurePassword;
  }
}
