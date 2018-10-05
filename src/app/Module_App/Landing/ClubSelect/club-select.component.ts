import { Component, OnInit, Input } from '@angular/core';
import { hoverScaleAnimation } from '../../../Module_Core';
import { IClub } from '../../../Module_Firebase/models';
import { Router } from '@angular/router';
import { RouteName } from '../../../routename';
import { MetaService } from '../../meta.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'club-select',
  templateUrl: 'club-select.component.html',
  styleUrls: ['club-select.component.scss'],
  animations: [hoverScaleAnimation]
})
export class ClubSelectComponent implements OnInit {
  @Input()
  club: IClub;

  clubImage: string;
  showImgOverlay = 'none';
  hoverState = 'mouseleave'; // mouseleave/moseenter
  constructor(private router: Router, private metaService: MetaService) {}

  ngOnInit() {
    this.clubImage = `assets/img/club/club_entry_${this.club.clubCode}.jpg`;
  }

  setMouseState(p: string) {
    this.hoverState = p;
    this.showImgOverlay = p === 'mouseenter' ? 'block' : 'none';
  }

  nav() {
    // this.metaService.navigateClub = {
    //   _id: this.club._id,
    //   clubName: this.club.clubName,
    //   clubCode: this.club.clubCode
    // };
    // const path = `${RouteName.Club}/${this.club.clubCode.toLowerCase()}`;
    const path = `${RouteName.Club}`;
    this.router.navigate([path], { queryParams: { clubId: this.club._id } });
  }
}
