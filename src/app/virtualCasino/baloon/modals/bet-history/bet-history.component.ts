import { NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { NetworkService } from '../../../../services/network.service';
import { ToggleService } from '../../../../services/toggle.service';



@Component({
  selector: 'app-bet-history',
  standalone: true,
  imports: [NgClass],
  templateUrl: './bet-history.component.html',
  styleUrl: './bet-history.component.css'
})
export class BetHistoryComponent {
  @Input() betHistory!: any[];
  betHistoryModalState: boolean = false;

  constructor(
    private el: ElementRef,
    private toggle: ToggleService,
    private networkService: NetworkService
  ) {}

  ngOnInit(): void {
    this.getBetHistoryModalState();
  }

  getBetHistoryModalState() {
    this.toggle.getBetHistoryModalState().subscribe((val: boolean) => {
      this.betHistoryModalState = val;
    });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (
      !this.el.nativeElement.contains(event.target) &&
      this.betHistoryModalState
    ) {
      this.toggle.setBetHistoryModalState(false);
    }
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
