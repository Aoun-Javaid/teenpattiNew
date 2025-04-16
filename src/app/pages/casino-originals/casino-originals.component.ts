import { NgClass, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UniverseOriginalsComponent } from '../universe-originals/universe-originals.component';
import { ActivatedRoute } from '@angular/router';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-casino-originals',
  standalone: true,
  imports: [UniverseOriginalsComponent, NgClass, NgIf],
  templateUrl: './casino-originals.component.html',
  styleUrl: './casino-originals.component.css',
})
export class CasinoOriginalsComponent implements OnInit {
  filterModal: boolean = false;
  @ViewChild('dropdownContainer', { static: true })
  dropdownContainer!: ElementRef;
  providerName: any;

  constructor(
    private route: ActivatedRoute,
    private networkService: NetworkService
  ) {}

  ngOnInit(): void {
    this.providerName = this.route.snapshot.params['name'];
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event) {
    const clickedElement = event.target as HTMLElement;

    if (!this.dropdownContainer.nativeElement.contains(clickedElement)) {
      this.filterModal = false;
    }
  }

  gotoEvent(event: any) {
    this.networkService.goToMarketCurrent(event.gameId);
    console.log('Working Successfully...');
  }
}
