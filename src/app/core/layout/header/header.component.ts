import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { ThemeService } from 'src/app/shared/services/teme.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  menuItems: MenuItem[];
  theme: any = ""
  userName = "Med Ali Nouri"

  visible: boolean = false;
  mainFeedTitle: string = ""
  constructor(private authService: AuthService, public themeService: ThemeService, public sideBarService: SidebarService, private cdr: ChangeDetectorRef, private router: Router) {
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
  ValidateUser(): any {
    if (this.authService.getToken() != null) {
      // this.router.navigateByUrl("/userDetails")
      return true;
    }
    else {
      // this.router.navigateByUrl("/login")
      return false
    }
  }
  RemoveUser(): any {
    localStorage.removeItem("token");
  }
  showDialog() {
    this.validateRouter()
    return this.visible = true;
  }
  validateRouter() {
    this.mainFeedTitle = this.router.url;
    if (this.mainFeedTitle == "/")
      this.mainFeedTitle = "Title  Home";
    else if (this.mainFeedTitle == "/immobiliereDetails")
      this.mainFeedTitle = "Title  Immobiliere details";
    else if (this.mainFeedTitle == "/room")
      this.mainFeedTitle = "Title  Room";
    else if (this.mainFeedTitle == "/login")
      this.mainFeedTitle = "Title  login";
    else if (this.mainFeedTitle == "/register")
      this.mainFeedTitle = "Title  Register";

  }
}
