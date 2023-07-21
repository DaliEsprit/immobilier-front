import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { ThemeService } from 'src/app/shared/services/teme.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  menuItems: MenuItem[];
  theme: any = ""
  userName = "Med Ali Nouri"
  currentUser:User=new User()
  visible: boolean = false;
  mainFeedTitle: string = ""
  constructor( 
    private socialAuthService: SocialAuthService,
    private authService: AuthService, 
    public themeService: ThemeService, 
    public sideBarService: SidebarService, 
    private cdr: ChangeDetectorRef, 
    private router: Router,
    private userser:UserService) {
    let themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    let themeToggleLightIcon = document.getElementById(
      'theme-toggle-light-icon'
    );
let user = JSON.parse(localStorage.getItem("user")) 
this.userName = user?.firstName + " " + (user?.lastName || "")
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
  ngOnInit(): void {
    this.userser.getCurrent().subscribe({
      next:(user:User)=>this.currentUser=user,
      error:()=>this.currentUser.role=""
    })
    console.log(this.currentUser)
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
    localStorage.clear()
    this.socialAuthService.signOut()
    this.authService.loggedIn=false
    this.authService.isGuest=false
    this.router.navigateByUrl("")
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
