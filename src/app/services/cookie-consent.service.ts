import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

interface ConsentStatus {
  accepted: boolean;
  timestamp: number;
}

@Injectable({
  providedIn: 'root',
})
export class CookieConsentService {
  private consentCookieName = 'user_cookie_consent';

  constructor(private cookieService: CookieService) {}

  hasConsent(): boolean {
    const cookie = this.cookieService.get(this.consentCookieName);
    if (!cookie) return false;

    try {
      const consent: ConsentStatus = JSON.parse(cookie);
      return consent.accepted;
    } catch {
      return false;
    }
  }

  setConsent(accepted: boolean): void {
    const consent: ConsentStatus = {
      accepted,
      timestamp: Date.now(),
    };
    this.cookieService.set(
      this.consentCookieName,
      JSON.stringify(consent),
      365
    );
  }

  clearConsent(): void {
    this.cookieService.delete(this.consentCookieName);
  }
}
