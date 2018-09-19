import { Component, OnInit, Input } from '@angular/core';
import { slideUpDownAnimation, displayChanged } from '../../Module_Core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'header-info',
  templateUrl: 'header-info.component.html',
  styleUrls: ['header-info.component.scss'],
  animations: [slideUpDownAnimation, displayChanged]
})
export class HeaderInfoComponent implements OnInit {
  @Input()
  showContact = 'hide';
  @Input()
  showTimings = 'hide';

  constructor() {}

  ngOnInit() {}
}
