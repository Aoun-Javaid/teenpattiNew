import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToggleService } from '../../services/toggle.service';

@Component({
  selector: 'app-bet-slip',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './bet-slip.component.html',
  styleUrl: './bet-slip.component.css'
})
export class BetSlipComponent implements OnInit {
  WinnerDropdown = false;
  activeTab: number = 1;
  betSlip = false;
  BetslipContent = true;

  clearBetslip() {
    this.BetslipContent = false;
  }

  toggleDropdown() {
    this.WinnerDropdown = !this.WinnerDropdown;
  }

  // Odds dropdown
  OddsDropdown = false;
  selectedOddsOption: string = "No Odds Changes Accepted";
  toggleOddsDropdown() {
    this.OddsDropdown = !this.OddsDropdown;
  }

  selectOddsOption(option: string) {
    this.selectedOddsOption = option;
    this.OddsDropdown = false;
}

  //  Switch Tabs
  setActiveTab(tabIndex: number): void {
    this.activeTab = tabIndex;
  }

  // Close Betslip
  showModal: boolean = false;
  constructor(private toggleService: ToggleService) { }
  ngOnInit(): void {
    this.toggleService.getBetslipState().subscribe(value => {
      this.betSlip = value;
    });
  }

  closeModal() {
    this.toggleService.setBetslipstate(!this.betSlip);
  }

}
