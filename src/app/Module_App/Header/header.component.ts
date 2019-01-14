import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import RouteName from '../../routename';
import { EventService, UtilService } from '../../Module_Core';
import { IClub, IUser } from '../../Module_Firebase';
import { Subscription, Observable } from 'rxjs';
import { MetaService } from '../meta.service';
import { EventName } from '../config';
import { filter, tap } from 'rxjs/operators';
import { FireAuthService } from '../../Module_Firebase/firebase.auth.service';
import { ClubService } from '../_shared/club.service';
import { Select } from '@ngxs/store';
import { AppState } from '../app.store/app.state';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'master-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {
  showContact = 'hide';
  showTimings = 'hide';
  navClub: IClub;
  navClubId: string;
  loggedInUser: IUser;
  clubName = 'Sport Center';

  r_selected = RouteName.Home;
  r_home = RouteName.Home;
  r_signup = RouteName.SignUp;
  r_signin = RouteName.SignIn;
  r_event = RouteName.Event;
  r_clubs = RouteName.ClubSetting;
  r_user = RouteName.User;
  r_accounts = RouteName.AccountSetting;
  r_bookings = RouteName.BookingSetting;
  loginBadge = '?';
  sub: Subscription;

  @Select(AppState.currentUser) currentUser$: Observable<IUser>;

  constructor(
    private router: Router,
    private eventService: EventService,
    private utilService: UtilService,
    private metaService: MetaService,
    private clubService: ClubService,
    private authService: FireAuthService
  ) { }

  ngOnInit() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationStart))
      .subscribe(event => {
        this.navClubId = this.metaService.getUrlClubId(event['url']);
        this.updateStatus(this.navClubId);
      });
  }

  private updateStatus(navClubId: string) {
    this.navClub = {
      clubName: 'Sport Center',
      clubCode: '',
      mapLink: '',
      address: '',
      phone1: '',
      email: '',
      contactName: ''
    };

    // // update login status
    // this.authService.getCurrentUser().subscribe(u => {
    //   this.loggedInUser = u ? u : null;
    //   // pub to mobile menu
    //   this.eventService.pub<IUser>(
    //     EventName.Event_LoggedInUserChanged,
    //     this.loggedInUser
    //   );
    // });

    if (!navClubId) {
      return;
    }
    // update navigated club status
    this.clubService.getClubById(navClubId).subscribe(club => {
      if (!club) {
        return;
      }
      this.navClub = club;
      this.clubName = this.navClub.clubName;
      this.navClub.mapLink = this.navClub.mapLink
        ? this.utilService.sanitizeUrl(this.navClub.mapLink)
        : '';
    });
  }

  onShowContact() {
    if (!this.navClubId) {
      return;
    }
    this.showTimings = 'hide';
    this.showContact = this.showContact === 'hide' ? 'show' : 'hide';
  }

  onShowTimings() {
    if (!this.navClubId) {
      return;
    }
    this.showContact = 'hide';
    this.showTimings = this.showTimings === 'hide' ? 'show' : 'hide';
  }

  nav(route: string, withClubId?: boolean) {
    this.hideHeaderInfo();
    if (route) {
      this.r_selected = route;
      if (withClubId) {
        if (!this.navClubId) {
          return;
        }
        this.router.navigate([route], {
          queryParams: { clubId: this.navClubId }
        });
      } else {
        this.router.navigate([route]);
      }
    }
  }

  onSignOut() {
    this.metaService.signOut().then(c => this.updateStatus(''));
  }

  toggleMobileMenu() {
    this.eventService.pub(EventName.Event_MobileToggleClicked);
  }

  private hideHeaderInfo() {
    this.showTimings = 'hide';
    this.showContact = 'hide';
  }

  // checkShowSettings() {
  //   return (
  //     this.loggedInUser &&
  //     (this.loggedInUser.isSuperAdmin || this.loggedInUser.isAdmin)
  //   );
  // }

  // checkShowProfile() {
  //   return this.isLoggedIn && this.navClubId && !this.loggedInUser.isSuperAdmin;
  // }
}
