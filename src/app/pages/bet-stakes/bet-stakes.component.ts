import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CONFIG, STACK_VALUE } from '../../../../config';
import { IndexedDbService } from '../../services/indexed-db.service';
import { NetworkService } from '../../services/network.service';
import { ToggleService } from '../../services/toggle.service';

@Component({
  selector: 'app-bet-stakes',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './bet-stakes.component.html',
  styleUrl: './bet-stakes.component.css'
})
export class BetStakesComponent implements OnInit{
  stackButtonArry = STACK_VALUE;
  editable:boolean =false;
  @Input() showTitle:boolean=true;
  @Input() isPopup:boolean=false;

  constructor(
    private indexedDb:IndexedDbService,
    private networkService:NetworkService,
    private router:Router,
    private toggle:ToggleService
    ){

  }
  ngOnInit(): void {
    this.getStackData();
  }
  getStackData() {
    const path = CONFIG.userGetStackURL.split('/').filter(Boolean).pop();
    this.indexedDb.getRecord(path).subscribe((res: any) => {
      if (res?.data?.stake) {
        this.stackButtonArry = res.data.stake;
      } else {
        this.stackButtonArry = STACK_VALUE;
      }
    })

  }
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 45 || charCode > 57)) {
      return false;
    }
    return true;

  }
  updateBetSetting() {

    let respRes: any = {};
    let isDuplicateArry = [];

    for (var i = 0; i < this.stackButtonArry.length; i++) {

      if (this.stackButtonArry[i].stakeAmount == '' || this.stackButtonArry[i] == undefined) {
        // this.toaster.error('Enter required values.', '', {
        //   positionClass: 'toast-top-center',
        // });
        return;
      }

      respRes[this.stackButtonArry[i].stakeAmount] = this.stackButtonArry[i].stakeAmount;
      isDuplicateArry[i] = parseInt(this.stackButtonArry[i].stakeAmount);
    }


    if (this.hasDuplicates(isDuplicateArry)) {
      // this.toaster.error('Duplicate values not allowed.', '', {
      //   positionClass: 'toast-top-center',
      // });
      return;
    }
    let data = {
      data: {
        stake: this.stackButtonArry
      }
    }
    const path = CONFIG.userGetStackURL.split('/').filter(Boolean).pop();
    this.indexedDb.updateRecord(path, data).subscribe((res: any) => {
    });
    this.networkService.getAllRecordsByPost(CONFIG.updateUserBetStake, { stake: JSON.stringify(respRes) })
      .subscribe((data: any) => {
        if (data.meta && data.meta.status === true) {
          // this.toaster.success(data.meta.message, '');
          if(!this.isPopup){
            this.router.navigate(['/home']);
          }
          else{
            this.toggle.setQuickStakeEditSidebarState(false);
            this.toggle.setStakeChanged(true);
          }

        }
      })


  }

  hasDuplicates(arr: any) {
    return new Set(arr).size !== arr.length;
  }
}
