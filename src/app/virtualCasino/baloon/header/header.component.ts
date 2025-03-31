import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { ToggleService } from '../../../services/toggle.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() onBgMusicChange: EventEmitter<boolean> =
  new EventEmitter<boolean>();
price = '3,000.00';
isToggled = false;
howPlayState: boolean = false;
navState: boolean = false;
bgMusicState: boolean = false;
bgSoundState: boolean = false;

constructor(private toggle: ToggleService) {}
ngOnInit(): void {
  this.getVariablesStateFromService();
}

getVariablesStateFromService() {
  this.toggle
    .getSoundState()
    .subscribe((val: boolean) => (this.bgSoundState = val));
}

toggleChanged() {
  console.log('Toggle state:', this.isToggled);
}

toggleNav() {
  this.navState = !this.navState;
}

howPlay() {
  this.howPlayState = !this.howPlayState;
  if (this.howPlayState) {
    setTimeout(() => {
      this.howPlayState = false;
    }, 3000);
  }
}

toggleMusic(event: any) {
  const isChecked = event.target.checked;
  this.bgMusicState = isChecked;
}
toggleBgMusic() {
  this.bgMusicState = !this.bgMusicState;
  this.onBgMusicChange.emit(this.bgMusicState);
}

toggleSound(event: any) {
  const isChecked = event.target.checked;
  this.bgMusicState = isChecked;
  this.toggle.setBgSoundState(this.bgSoundState);
}

@HostListener('document:click', ['$event'])
onClick(event: MouseEvent): void {
  const tooltipContainers = document.getElementsByClassName('nav-wrapper');

  for (let i = 0; i < tooltipContainers.length; i++) {
    if (tooltipContainers[i].contains(event.target as Node)) {
      return;
    }
  }
  this.navState = false;
}
}
