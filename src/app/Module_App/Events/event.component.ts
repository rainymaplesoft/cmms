import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

const pullUpDownAnimate =
  // trigger name for attaching this animation to an element using the [@triggerName] syntax
  trigger('pullUpDownAnimate', [
    state('show', style({ opacity: 1 })),
    state('hide', style({ opacity: 0 })),
    transition('show => hide', animate('600ms')),
    transition('hide => show', animate('300ms'))
  ]);

const rotateAnimate =
  // trigger name for attaching this animation to an element using the [@triggerName] syntax
  trigger('rotateAnimate', [
    state('right', style({ transform: 'rotate(90deg)' })),
    state('down', style({ transform: 'rotate(0)' })),
    transition('right => down', animate('600ms')),
    transition('down => right', animate('300ms'))
  ]);

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'event',
  templateUrl: 'event.component.html',
  styleUrls: ['event.component.scss'],
  animations: [pullUpDownAnimate, rotateAnimate]
})
export class EventComponent implements OnInit {
  indicator_state;
  constructor() {}

  ngOnInit() {}
}
