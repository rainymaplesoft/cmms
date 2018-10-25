import { Component, OnInit, Input } from '@angular/core';
import { IMenuItem } from '../mobile-menu.component';
import { EventName } from '../../../config';
import {
  rotateAnimate,
  pullUpDownAnimate,
  EventService
} from '../../../../Module_Core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'menu-item',
  templateUrl: 'menu-item.component.html',
  styleUrls: ['menu-item.component.scss'],
  animations: [rotateAnimate, pullUpDownAnimate]
})
export class MenuItemComponent implements OnInit {
  @Input()
  menuItem: IMenuItem;

  arrowState = 'right'; // right/down
  subMenuState = 'hide'; // hide/show

  constructor(private eventService: EventService) {}

  ngOnInit() {}

  onItemClick() {
    if (this.menuItem.sub_menu) {
      this.onArrowClick();
    } else {
      this.eventService.pub<string>(
        EventName.Event_MenuItemClicked,
        this.menuItem.action
      );
    }
  }

  onArrowClick() {
    this.arrowState = this.arrowState === 'right' ? 'down' : 'right';
    this.subMenuState = this.arrowState === 'right' ? 'hide' : 'show';
  }
}
