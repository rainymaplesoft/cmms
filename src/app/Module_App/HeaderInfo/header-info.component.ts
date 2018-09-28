import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { pullUpDownAnimate } from '../../Module_Core';
import { IClub } from '../../Module_Firebase';

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

  constructor() {}

  ngOnInit() {}
  ngOnChanges(e) {
    const aa = this.club;
  }
}
