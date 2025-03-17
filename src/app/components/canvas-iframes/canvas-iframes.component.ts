import { NgClass } from '@angular/common';
import { Component, HostListener, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { DeviceDetectorService } from 'ngx-device-detector';
import { CONFIG } from '../../../../config';
import { MainService } from '../../services/main.service';


@Component({
  selector: 'app-canvas-iframes',
  standalone: true,
  imports: [NgClass],
  templateUrl: './canvas-iframes.component.html',
  styleUrl: './canvas-iframes.component.css'
})
export class CanvasIframesComponent {
  iframeUrl: SafeResourceUrl;
  staticUrl = CONFIG.vimaanIframeUrl;
  token: any;
  isMobile: any;
  eventId: any;
  routeSub: any;
  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2, private deviceService: DeviceDetectorService,
    private mainService: MainService, private router: Router) {
    this.token = localStorage.getItem('token');

    this.eventId = localStorage.getItem('eventId');

    this.iframeUrl = this.sanitizeUrl(this.staticUrl + '/auth/' + this.eventId + '/' + this.token + '/true');// true if this app has footer
    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit() {
    if (this.isMobile) {
      const footerMenuElement = document.getElementById('mobile-footer-menuId');

      if (footerMenuElement) {
        const height = footerMenuElement.offsetHeight;
        const bottomSheetElement = document.querySelector('.aviator-layout');
        if (bottomSheetElement) {
          this.renderer.setStyle(bottomSheetElement, 'min-height', `calc(100vh - ${height - 1}px)`);
        }
      }
    }

  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    // console.log('Message received:', event);
    // if (event.origin !== this.staticUrl) {
    //   return;
    // }

    // console.log('Message received from iframe:', event.data);

    // Handle the message from iframe
    if (event.data === 'getBalance') {
      this.mainService.getBalance();
      // console.warn('getBalance api call here')
    }
    if (event.data === 'IframeClosed') {
      this.closeIframe();
    }
    if (event.data === 'unautherized') {
      this.closeIframe();
      this.router.navigateByUrl('/unauthorized');
    }
  }
  closeIframe() {
    // this.mainService.setMiniCasinoOpened(false);
  }
}
