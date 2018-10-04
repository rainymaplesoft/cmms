import { Component, OnInit, Host } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import RouteName from '../../routename';
import { EventService, UtilService } from '../../Module_Core';
import { FireAuthService } from '../../Module_Firebase';
import { take, tap, map, filter } from 'rxjs/operators';
import { IClub } from '../../Module_Firebase/models';
import { Subscription } from 'rxjs';
import { MetaService } from '../meta.service';
import { EventName } from '../config';

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
  club: IClub;
  clubId = '';
  clubName = 'Sport Center';

  r_selected = RouteName.Home;
  r_home = RouteName.Home;
  r_signup = RouteName.Sign;
  r_event = RouteName.Event;
  r_clubs = RouteName.ClubSetting;
  r_user = RouteName.User;
  r_accounts = RouteName.AccountSetting;
  r_bookings = RouteName.AccountSetting;
  loginBadge = '?';
  sub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService,
    private utilService: UtilService,
    private metaService: MetaService
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter(e => {
          return !!e['navigationTrigger'];
        })
      )
      .subscribe(params => {
        this.getClubInfo(params);
        this.checkLogin();
      });
    this.eventService
      .on(EventName.Event_SignOut)
      .subscribe(e => this.checkLogin());
  }

  private checkLogin() {
    this.metaService.loggedInUser.subscribe(u => {
      this.isLoggedIn = !!u;
    });
  }

  onShowContact() {
    this.showTimings = 'hide';
    this.showContact = this.showContact === 'hide' ? 'show' : 'hide';
  }

  onShowTimings() {
    this.showContact = 'hide';
    this.showTimings = this.showTimings === 'hide' ? 'show' : 'hide';
  }

  nav(route: string, withClubId: false) {
    this.hideHeaderInfo();
    const clubId = this.metaService.getUrlClubId(this.router.url);
    if (route) {
      this.r_selected = route;
      if (withClubId) {
        if (!clubId) {
          return;
        }
        this.router.navigate([route], { queryParams: { clubId: clubId } });
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

  private getClubInfo(params) {
    this.club = null;
    this.clubName = 'Sport Center';
    const navClubId = this.metaService.getUrlClubId(params['url']);
    if (!navClubId) {
      return;
    }
    this.metaService.getClubById(navClubId).subscribe(club => {
      if (!club) {
        this.router.navigate([RouteName.Home]);
      }
      this.club = club;
      this.clubName = this.club.clubName;
      this.club.mapLink = this.club.mapLink
        ? this.utilService.sanitizeUrl(this.club.mapLink)
        : '';
    });
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
