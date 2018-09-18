import { Component, OnInit, Input } from '@angular/core';
import { slideUpDownAnimation } from '../../Module_Core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'header-info',
  templateUrl: 'header-info.component.html',
  styles: ['header-info.component.scss'],
  animations: [slideUpDownAnimation]
})
export class HeaderInfoComponent implements OnInit {
  @Input()
  showContact: boolean;
  @Input()
  showTimings: boolean;

  constructor() {}

  ngOnInit() {}
}
