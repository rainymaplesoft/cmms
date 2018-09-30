import { Component, OnInit, Host } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import RouteName from '../../routename';
import { PubSubService, UtilService } from '../../Module_Core';
import { FireAuthService } from '../../Module_Firebase';
import { take, tap, map, filter } from 'rxjs/operators';
import { IClub } from '../../Module_Firebase/models';
import { MetaService } from 'src/app/Module_Shared';

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
  r_signup = RouteName.SignUp;
  r_event = RouteName.Event;
  r_clubs = RouteName.ClubSetting;
  loginBadge = '?';

  constructor(
    private router: Router,
    private eventService: PubSubService,
    private authService: FireAuthService,
    private utilService: UtilService,
    private metaService: MetaService
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(e => !!e['navigationTrigger']))
      .subscribe(url => {
        this.hideHeaderInfo();
        const u: string = url['url'];
        if (u.indexOf('/club/') !== 0) {
          return;
        }
        const clubCode = u.replace('/club/', '').substr(0, 4);
        // this.clubId = this.utilService.getUrlParam(u, 'clubId');
        this.getClubInfo(clubCode);
      });
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

  nav(route: string) {
    if (route) {
      this.r_selected = route;
      this.router.navigate([route]);
    }
  }

  onLogout() {
    this.authService.signOut();
  }

  toggleMobileMenu() {
    this.eventService.pub('Event_MobileToggleClicked');
  }

  private getClubInfo(clubCode: string) {
    this.club = null;
    this.clubName = 'Sport Center';
    if (!clubCode) {
      return;
    }
    this.metaService.getClubByCode(clubCode).subscribe(club => {
      if (club && club.length > 0) {
        this.club = club[0];
        this.clubName = this.club.clubName;
        this.club.mapLink = this.club.mapLink
          ? this.utilService.sanitizeUrl(this.club.mapLink)
          : '';
      }
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
