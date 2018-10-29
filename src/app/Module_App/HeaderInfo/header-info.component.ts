import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { pullUpDownAnimate } from '../../Module_Core';
import { IClub } from '../../Module_Firebase';
import { Config } from '../config';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'header-info',
  templateUrl: 'header-info.component.html',
  styleUrls: ['header-info.component.scss'],
  animations: [pullUpDownAnimate]
})
export class HeaderInfoComponent implements OnInit, OnChanges {
  @Input()
  showContact = 'hide';
  @Input()
  showTimings = 'hide';
  @Input()
  club: IClub;

  openDay = { index: '', name: '' };
  constructor() {}

  ngOnInit() {}
  ngOnChanges(e) {
    const aa = this.club;
    if (this.club && this.club.openDays) {
      this.openDay = Config.WeekdayObjects.find(
        d => d.index === this.club.openDays
      );
    }
  }
}
