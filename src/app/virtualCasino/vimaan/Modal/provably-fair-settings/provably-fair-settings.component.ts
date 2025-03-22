import { NgClass } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleService } from '../../../serivces/toggle.service';
import { ChangeSeedModalComponent } from '../change-seed-modal/change-seed-modal.component';

@Component({
  selector: 'app-provably-fair-settings',
  standalone: true,
  imports: [NgClass, ChangeSeedModalComponent],
  templateUrl: './provably-fair-settings.component.html',
  styleUrl: './provably-fair-settings.component.css',
})
export class ProvablyFairSettingsComponent implements OnInit {
  provablyFairSettingState: boolean = false;
  selectedOption: string = 'random';
  changeSeedModalState: boolean = false;

  constructor(private toggle: ToggleService, private el: ElementRef) {}
  ngOnInit(): void {
    this.getProvablyFairSettingState();
    this.getChangeSeedModalState();
  }

  changeSelectedOption(val: string) {
    this.selectedOption = val;
  }

  getProvablyFairSettingState() {
    this.toggle.getProvablyFairSettingState().subscribe((val: boolean) => {
      this.provablyFairSettingState = val;
    });
  }
  getChangeSeedModalState() {
    this.toggle.getChangeSeedState().subscribe((val: boolean) => {
      this.changeSeedModalState = val;
    });
  }
  openChangeSeedModal() {
    if (this.selectedOption === 'manual') {
      setTimeout(() => {
        this.toggle.setChangeSeedModalState(true);
      });
    }
  }

  closeProvablyFairSettings() {
    this.toggle.setProvablyFairSettingState(false);
  }

  openProvablyFairModal() {
    setTimeout(() => {
      this.toggle.setProvablyFairModalState(true);
      this.closeProvablyFairSettings();
    });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (
      !this.el.nativeElement.contains(event.target) &&
      this.provablyFairSettingState
    ) {
      this.closeProvablyFairSettings();
    }
  }
}
