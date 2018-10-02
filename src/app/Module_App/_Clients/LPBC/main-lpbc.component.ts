import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../../Module_Firebase';
import RouteName from 'src/app/routename';
import { MetaService } from '../../meta.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'main-lpbc',
  templateUrl: 'main-lpbc.component.html',
  styleUrls: ['../client.component.scss']
})
export class MainLPBCComponent implements OnInit {
  clubId: string;
  loggedInUser: IUser;
  banner = `assets/img/club/club_banner_LPBC.jpg`;

  constructor(private router: Router, private metaService: MetaService) {}

  ngOnInit() {
    this.clubId = this.metaService.getUrlClubId(this.router.url);
    this.metaService.loggedInUser.subscribe(u => {
      this.loggedInUser = u;
    });
  }

  onLogin() {
    this.router.navigate([RouteName.Sign], {
      queryParams: { clubId: this.clubId }
    });
  }

  get welcome() {
    return this.loggedInUser
      ? `${this.loggedInUser.firstName} ${this.loggedInUser.lastName}`
      : ' To Our Badminton Club';
  }
}
