import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CookieConsentService } from '../../services/cookie-consent.service';

@Component({
  selector: 'app-cookies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookies.component.html',
  styleUrl: './cookies.component.css',
})
export class CookiesComponent implements OnInit {
  showCookies: boolean = false;

  constructor(private cookieConsentService: CookieConsentService) {}

  ngOnInit(): void {
    this.showCookies = !this.cookieConsentService.hasConsent();
  }

  accept(): void {
    this.cookieConsentService.setConsent(true);
    this.showCookies = false;
  }
}
