import { NgClass, NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { UniverseOriginalsComponent } from "../universe-originals/universe-originals.component";

@Component({
  selector: 'app-casino-originals',
  standalone: true,
  imports: [UniverseOriginalsComponent,NgClass,NgIf],
  templateUrl: './casino-originals.component.html',
  styleUrl: './casino-originals.component.css'
})
export class CasinoOriginalsComponent {
filterModal:boolean=false;
@ViewChild('dropdownContainer', { static: true }) dropdownContainer!: ElementRef;

constructor() {}


@HostListener('document:click', ['$event'])
handleOutsideClick(event: Event) {
  const clickedElement = event.target as HTMLElement;

  if (!this.dropdownContainer.nativeElement.contains(clickedElement)) {
    this.filterModal = false;
  }
}

}
