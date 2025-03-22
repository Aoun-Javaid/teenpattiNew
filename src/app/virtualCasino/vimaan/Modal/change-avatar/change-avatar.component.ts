import { NgClass } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ToggleService } from '../../../serivces/toggle.service';

@Component({
  selector: 'app-change-avatar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './change-avatar.component.html',
  styleUrl: './change-avatar.component.css',
})
export class ChangeAvatarComponent implements OnInit {
  changeAvatarModalState: boolean = false;

  constructor(private toggle: ToggleService, private el: ElementRef) {}
  ngOnInit(): void {
    this.getChangeAvatarModalState();
  }

  getChangeAvatarModalState() {
    this.toggle.getChangeAvatarModalState().subscribe((val: boolean) => {
      this.changeAvatarModalState = val;
    });
  }

  closeChangeAvatarModal() {
    this.toggle.setChangeAvatarModalState(false);
  }

  avatarImages = [
    { img: '/assets/avatar-images/av-1.png' },
    { img: '/assets/avatar-images/av-2.png' },
    { img: '/assets/avatar-images/av-3.png' },
    { img: '/assets/avatar-images/av-4.png' },
    { img: '/assets/avatar-images/av-5.png' },
    { img: '/assets/avatar-images/av-6.png' },
    { img: '/assets/avatar-images/av-7.png' },
    { img: '/assets/avatar-images/av-8.png' },
    { img: '/assets/avatar-images/av-9.png' },
    { img: '/assets/avatar-images/av-10.png' },
    { img: '/assets/avatar-images/av-11.png' },
    { img: '/assets/avatar-images/av-12.png' },
    { img: '/assets/avatar-images/av-13.png' },
    { img: '/assets/avatar-images/av-14.png' },
    { img: '/assets/avatar-images/av-15.png' },
    { img: '/assets/avatar-images/av-16.png' },
    { img: '/assets/avatar-images/av-17.png' },
    { img: '/assets/avatar-images/av-18.png' },
    { img: '/assets/avatar-images/av-19.png' },
    { img: '/assets/avatar-images/av-20.png' },
    { img: '/assets/avatar-images/av-21.png' },
    { img: '/assets/avatar-images/av-22.png' },
    { img: '/assets/avatar-images/av-23.png' },
    { img: '/assets/avatar-images/av-24.png' },
    { img: '/assets/avatar-images/av-25.png' },
    { img: '/assets/avatar-images/av-26.png' },
    { img: '/assets/avatar-images/av-27.png' },
    { img: '/assets/avatar-images/av-28.png' },
    { img: '/assets/avatar-images/av-29.png' },
    { img: '/assets/avatar-images/av-30.png' },
    { img: '/assets/avatar-images/av-31.png' },
    { img: '/assets/avatar-images/av-32.png' },
    { img: '/assets/avatar-images/av-33.png' },
    { img: '/assets/avatar-images/av-34.png' },
    { img: '/assets/avatar-images/av-35.png' },
    { img: '/assets/avatar-images/av-36.png' },
    { img: '/assets/avatar-images/av-37.png' },
    { img: '/assets/avatar-images/av-38.png' },
    { img: '/assets/avatar-images/av-39.png' },
    { img: '/assets/avatar-images/av-40.png' },
    { img: '/assets/avatar-images/av-41.png' },
    { img: '/assets/avatar-images/av-42.png' },
    { img: '/assets/avatar-images/av-43.png' },
    { img: '/assets/avatar-images/av-44.png' },
    { img: '/assets/avatar-images/av-45.png' },
    { img: '/assets/avatar-images/av-46.png' },
    { img: '/assets/avatar-images/av-47.png' },
    { img: '/assets/avatar-images/av-48.png' },
    { img: '/assets/avatar-images/av-49.png' },
    { img: '/assets/avatar-images/av-50.png' },
    { img: '/assets/avatar-images/av-51.png' },
    { img: '/assets/avatar-images/av-52.png' },
    { img: '/assets/avatar-images/av-53.png' },
    { img: '/assets/avatar-images/av-54.png' },
    { img: '/assets/avatar-images/av-55.png' },
    { img: '/assets/avatar-images/av-56.png' },
    { img: '/assets/avatar-images/av-57.png' },
    { img: '/assets/avatar-images/av-58.png' },
    { img: '/assets/avatar-images/av-59.png' },
    { img: '/assets/avatar-images/av-60.png' },
    { img: '/assets/avatar-images/av-61.png' },
    { img: '/assets/avatar-images/av-62.png' },
    { img: '/assets/avatar-images/av-63.png' },
    { img: '/assets/avatar-images/av-64.png' },
    { img: '/assets/avatar-images/av-65.png' },
    { img: '/assets/avatar-images/av-66.png' },
    { img: '/assets/avatar-images/av-67.png' },
    { img: '/assets/avatar-images/av-68.png' },
    { img: '/assets/avatar-images/av-69.png' },
    { img: '/assets/avatar-images/av-70.png' },
    { img: '/assets/avatar-images/av-71.png' },
    { img: '/assets/avatar-images/av-72.png' },
  ];

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (
      !this.el.nativeElement.contains(event.target) &&
      this.changeAvatarModalState
    ) {
      this.closeChangeAvatarModal();
    }
  }
}
