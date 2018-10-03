import { Component, OnInit, Host } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import RouteName from '../../routename';
import { EventService, UtilService } from '../../Module_Core';
import { FireAuthService } from '../../Module_Firebase';
import { take, tap, map, filter } from 'rxjs/operators';
import { IClub } from '../../Module_Firebase/models';
import { Subscription } from 'rxjs';
import { MetaService } from '../meta.service';
import { OnEvent } from '../config';

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
  loginBadge = '?';
  sub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService,
    private authService: FireAuthService,
    private utilService: UtilService,
    private metaService: MetaService
  ) {}

  ngOnInit() {
    this.authService.authState.subscribe(u => {
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
    this.eventService.pub(OnEvent.Event_MobileToggleClicked);
  }

  private getClubInfo(clubId: string) {
    this.club = null;
    this.clubName = 'Sport Center';
    if (!clubId) {
      return;
    }
    this.metaService.getClubById(this.clubId).subscribe(club => {
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
