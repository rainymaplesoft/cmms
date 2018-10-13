import { Component, OnInit, Host } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import RouteName from '../../routename';
import { EventService, UtilService } from '../../Module_Core';
import { IClub, IMetaInfo, IUser } from '../../Module_Firebase';
import { Subscription } from 'rxjs';
import { MetaService } from '../meta.service';
import { EventName } from '../config';
import { filter, tap } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'master-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {
  showContact = 'hide';
  showTimings = 'hide';
  isLoggedIn = false;
  navClub: IClub;
  navClubId: string;
  loggedInUser: IUser;
  clubName = 'Sport Center';

  r_selected = RouteName.Home;
  r_home = RouteName.Home;
  r_signup = RouteName.SignUp;
  r_event = RouteName.Event;
  r_clubs = RouteName.ClubSetting;
  r_user = RouteName.User;
  r_accounts = RouteName.AccountSetting;
  r_bookings = RouteName.BookingSetting;
  loginBadge = '?';
  sub: Subscription;

  // get clubId() {
  //   const clubId = this.metaService.getUrlClubId(this.router.url);
  //   // const clubId = this.utilService.getUrlParam('clubId');
  //   return clubId;
  // }

  constructor(
    private router: Router,
    private eventService: EventService,
    private utilService: UtilService,
    private metaService: MetaService
  ) {}

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
      mapLink: ''
    };
    if (!navClubId) {
      return;
    }
    // update login status
    this.metaService.getLoggedInUser.subscribe(u => {
      this.isLoggedIn = !!u;
      this.loggedInUser = u;
    });
    // update navigated club status
    this.metaService.getClubById(navClubId).subscribe(club => {
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
    this.metaService.signOut();
    this.router.navigate([RouteName.Home]);
  }

  toggleMobileMenu() {
    this.eventService.pub(EventName.Event_MobileToggleClicked);
  }

  private hideHeaderInfo() {
    this.showTimings = 'hide';
    this.showContact = 'hide';
  }
  //#region logo image data
  // tslint:disable-next-line:member-ordering
  logo = '';
  //#endregion
}
