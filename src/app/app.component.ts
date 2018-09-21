import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { PubSubService } from './Module_Core';
import { Route, Router } from '@angular/router';
import { MobileMenu } from './routename';

const menuSlideAnimate =
  // trigger name for attaching this animation to an element using the [@triggerName] syntax
  trigger('menuSlideAnimate', [
    state('show', style({ left: '0' })),
    state('hide', style({ left: '-240px' })),
    transition('show => hide', animate('200ms')),
    transition('hide => show', animate('200ms'))
  ]);
const containerSlideAnimate =
  // trigger name for attaching this animation to an element using the [@triggerName] syntax
  trigger('containerSlideAnimate', [
    state('normal', style({ left: '0' })),
    state('right', style({ left: '240px' })),
    transition('normal => right', animate('200ms')),
    transition('right => normal', animate('200ms'))
  ]);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [menuSlideAnimate, containerSlideAnimate]
})
export class AppComponent {
  title = 'cmms';
  mobileMenuState = 'hide'; // hide/show
  containerState = 'normal'; // normal/right
  mobileMenu = MobileMenu;

  constructor(private eventService: PubSubService, private router: Router) {
    this.eventSubscripe();
  }

  eventSubscripe() {
    // from MobileMenu
    this.eventService.on<string>('Event_MenuItemClicked').subscribe(r => {
      if (r) {
        this.router.navigate([r]);
      }
      this.toggleMobileMenu();
    });
  }

  toggleMobileMenu() {
    this.mobileMenuState = this.mobileMenuState === 'hide' ? 'show' : 'hide';
    this.containerState = this.mobileMenuState === 'hide' ? 'normal' : 'right';
  }

  containerClick(event: MouseEvent) {
    const toggleButtonId = 'mobile-menu-toggle';
    if (
      event.srcElement.id === toggleButtonId ||
      event.srcElement.parentElement.id === toggleButtonId
    ) {
      return;
    }
    if (this.mobileMenuState === 'show') {
      this.mobileMenuState = 'hide';
      this.containerState = 'normal';
    }
  }
}
