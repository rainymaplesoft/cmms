import { Component, OnInit, Input } from '@angular/core';
import { hoverScaleAnimation } from '../../../Module_Core';
import { IClub } from '../../../Module_Firebase/models';

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
  constructor() {}

  ngOnInit() {
    this.clubImage = `assets/img/club/club_entry_${this.club.clubCode}.jpg`;
  }

  setMouseState(p: string) {
    this.hoverState = p;
    this.showImgOverlay = p === 'mouseenter' ? 'block' : 'none';
  }
}
