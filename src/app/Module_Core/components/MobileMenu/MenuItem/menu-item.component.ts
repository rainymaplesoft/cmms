import { Component, OnInit, Input } from '@angular/core';
import { IMenuItem } from '../mobile-menu.component';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { PubSubService } from '../../../services';
const pullUpDownAnimate =
  // trigger name for attaching this animation to an element using the [@triggerName] syntax
  trigger('pullUpDownAnimate', [
    state('show', style({ height: '*', display: 'block', opacity: 1 })),
    state('hide', style({ height: 0, display: 'none', overflow: 'hidden' })),
    transition('show => hide', animate('200ms')),
    transition('hide => show', animate('200ms'))
  ]);

const rotateAnimate =
  // trigger name for attaching this animation to an element using the [@triggerName] syntax
  trigger('rotateAnimate', [
    state('right', style({ transform: 'rotate(0)' })),
    state('down', style({ transform: 'rotate(90deg)' })),
    transition('right => down', animate('200ms')),
    transition('down => right', animate('200ms'))
  ]);

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

  constructor(private eventService: PubSubService) {}

  ngOnInit() {}

  onItemClick() {
    this.eventService.pub<string>(
      'Event_MenuItemClicked',
      this.menuItem.action
    );
  }

  onArrowClick() {
    this.arrowState = this.arrowState === 'right' ? 'down' : 'right';
    this.subMenuState = this.arrowState === 'right' ? 'hide' : 'show';
  }
}
