import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {
  filterModal:boolean=false;
  activeTab='crypto';
@ViewChild('dropdownContainer', { static: true }) dropdownContainer!: ElementRef;
  constructor(private location:Location){

  }

  gotoBack(){
    this.location.back();
    document.body.classList.remove('overflow-hidden');
  }


@HostListener('document:click', ['$event'])
handleOutsideClick(event: Event) {
  const clickedElement = event.target as HTMLElement;

  if (!this.dropdownContainer.nativeElement.contains(clickedElement)) {
    this.filterModal = false;
  }
}
}
