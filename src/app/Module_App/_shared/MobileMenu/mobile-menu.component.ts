import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/Module_Core';

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
  @Input()
  isShowSettings: boolean;

  constructor(private router: Router, private eventService: EventService) {}

  ngOnInit() {}

  nav(route: string, withClubId?: boolean) {}
}
