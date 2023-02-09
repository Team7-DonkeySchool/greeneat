import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ColorSchemeService } from './services/color-scheme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'greeneatFront';
  static isBrowser = new BehaviorSubject<boolean>(false);

  constructor(private colorSchemeService: ColorSchemeService, @Inject(PLATFORM_ID) private platformId: any) {
    AppComponent.isBrowser.next(isPlatformBrowser(platformId));
    // Load Color Scheme
    this.colorSchemeService.load();
  }
  
}
