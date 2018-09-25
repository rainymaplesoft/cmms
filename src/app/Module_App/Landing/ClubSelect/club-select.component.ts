import { Component, OnInit, Input } from '@angular/core';
import { hoverScaleAnimation } from '../../../Module_Core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'club-select',
  templateUrl: 'club-select.component.html',
  styleUrls: ['club-select.component.scss'],
  animations: [hoverScaleAnimation]
})
export class ClubSelectComponent implements OnInit {
  @Input()
  clubImage: string;

  imgUrl: string;
  hoverState = 'mouseleave'; // mouseleave/moseenter
  constructor() {}

  ngOnInit() {
    this.imgUrl = `url(${this.clubImage})`;
  }

  setMouseState(p: string) {
    this.hoverState = p;
  }
}
