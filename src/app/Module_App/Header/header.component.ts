import { Component, OnInit, Host } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import RouteName from '../../routename';
import { EventService, UtilService } from '../../Module_Core';
import { IClub, IMetaInfo } from '../../Module_Firebase/models';
import { Subscription } from 'rxjs';
import { MetaService } from '../meta.service';
import { EventName } from '../config';
import { IUser } from 'src/app/Module_Firebase';

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
  clubId = '';
  clubName = 'Sport Center';

  r_selected = RouteName.Home;
  r_home = RouteName.Home;
  r_signup = RouteName.Sign;
  r_event = RouteName.Event;
  r_clubs = RouteName.ClubSetting;
  r_user = RouteName.User;
  r_accounts = RouteName.AccountSetting;
  r_bookings = RouteName.BookingSetting;
  loginBadge = '?';
  sub: Subscription;

  constructor(
    private router: Router,
    private eventService: EventService,
    private utilService: UtilService,
    private metaService: MetaService
  ) {}

  ngOnInit() {
    this.eventService
      .on<IMetaInfo>(EventName.Event_MetaInfoChanged)
      .subscribe((metaInfo: IMetaInfo) => {
        this.isLoggedIn = !!metaInfo.loggedinUser;
        // if (!metaInfo.navClub) {
        //   this.router.navigate([RouteName.Home]);
        // }
        this.navClub = metaInfo.navClub || {
          clubName: 'Sport Center',
          clubCode: '',
          mapLink: ''
        };
        this.clubName = this.navClub.clubName;
        this.navClub.mapLink = this.navClub.mapLink
          ? this.utilService.sanitizeUrl(this.navClub.mapLink)
          : '';
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

  nav(route: string, withClubId?: false) {
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

  private hideHeaderInfo() {
    this.showTimings = 'hide';
    this.showContact = 'hide';
  }
  //#region logo image data
  // tslint:disable-next-line:member-ordering
  logo = '';
  //#endregion
}
