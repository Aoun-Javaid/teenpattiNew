import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CookieConsentService } from '../../services/cookie-consent.service';

@Component({
  selector: 'app-cookies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookies.component.html',
  styleUrl: './cookies.component.css',
})
export class CookiesComponent implements  AfterViewInit {
  showCookies: boolean = false;

  constructor(private cookieConsentService: CookieConsentService) { }


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showCookies = !this.cookieConsentService.hasConsent();
    }, 1000);
  }

  accept(): void {
    this.cookieConsentService.setConsent(true);
    this.showCookies = false;
    document.body.classList.remove('scroll-locked');
  }
}