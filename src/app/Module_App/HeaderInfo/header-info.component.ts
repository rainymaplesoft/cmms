import { Component, OnInit, Input } from '@angular/core';
import { pullUpDownAnimate } from '../../Module_Core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'header-info',
  templateUrl: 'header-info.component.html',
  styleUrls: ['header-info.component.scss'],
  animations: [pullUpDownAnimate]
})
export class HeaderInfoComponent implements OnInit {
  @Input()
  showContact = 'hide';
  @Input()
  showTimings = 'hide';

  constructor() {}

  ngOnInit() {}
}
