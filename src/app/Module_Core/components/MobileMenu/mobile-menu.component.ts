import { Component, OnInit, Input } from '@angular/core';
import RouteName from '../../../routename';

export interface IMenuItem {
  menu_text: string;
  sub_menu?: IMenuItem[];
  action?: string;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mobile-menu',
  templateUrl: 'mobile-menu.component.html',
  styleUrls: ['mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {
  @Input()
  menu: IMenuItem[];

  constructor() {}

  ngOnInit() {}
}
