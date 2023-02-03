import { Component, Input, SimpleChanges } from '@angular/core';
import { ColorSchemeService } from '../../services/color-scheme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public themes = [
    {
      name: 'dark',
      icon: '../../assets/img/moon.svg'
    },
    {
      name: 'light',
      icon: '../../assets/img/sun.svg'
    }
  ];

  constructor(public colorSchemeService: ColorSchemeService) {
  }

  setTheme(theme: string) {
    console.log(theme);
    if (theme === 'dark') {
      this.colorSchemeService.update('light');
    } else {
    this.colorSchemeService.update('dark');
    }
  }
}
