import { Component, OnInit, Input } from '@angular/core';
import { IMenuItem } from '../mobile-menu.component';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { EventService } from '../../../services';
import { rotateAnimate, pullUpDownAnimate } from '../../../animation';
import { OnEvent } from '../../../../Module_App/config';

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
    this.eventService.pub<string>(
      OnEvent.Event_MenuItemClicked,
      this.menuItem.action
    );
  }

  onArrowClick() {
    this.arrowState = this.arrowState === 'right' ? 'down' : 'right';
    this.subMenuState = this.arrowState === 'right' ? 'hide' : 'show';
  }
}
