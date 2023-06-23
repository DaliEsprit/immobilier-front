import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { ThemeService } from 'src/app/shared/services/teme.service';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  menuItems: MenuItem[];
  theme: any = ""
  userName = "Med Ali Nouri"




  constructor(private authService: AuthService, public themeService: ThemeService, public sideBarService: SidebarService, private cdr: ChangeDetectorRef) {
    let themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    let themeToggleLightIcon = document.getElementById(
      'theme-toggle-light-icon'
    );


    this.themeService.theme$.subscribe(theme => {
      this.theme = theme
    })

    // || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    console.log(localStorage.getItem('theme'));

    if (localStorage.getItem('theme') === 'dark') {
      themeToggleLightIcon?.classList.remove('hidden');
    } else {
      themeToggleDarkIcon?.classList.remove('hidden');
    }
    this.menuItems = [
      {
        label: 'Home',
        routerLink: '/',
      },
      {
        label: 'About',
        routerLink: '/about',
      },
    ];
  }

  selectedItem!: any;

  suggestions!: any[];
  search(event: any) {
    this.suggestions = [...Array(10).keys()].map(item => event.query + '-' + item);
  }

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }

  
}
