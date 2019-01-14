import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { EventService } from './Module_Core';
import { Route, Router } from '@angular/router';
import { EventName, Config } from './Module_App/config';
import { IUser } from './Module_Firebase';
import { Select } from '@ngxs/store';
import { AppState } from './Module_App/app.store/app.state';
import { Observable } from 'rxjs';

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
  mobileMenu = Config.MobileMenu;
  isShowSettings = false;

  @Select(AppState.currentUser) currentUser$: Observable<IUser>;

  constructor(private eventService: EventService, private router: Router) {
    this.eventSubscripe();
  }

  eventSubscripe() {
    // from MobileMenu
    this.eventService
      .on<string>(EventName.Event_MenuItemClicked)
      .subscribe(r => {
        if (r) {
          this.router.navigate([r]);
        }
        this.toggleMobileMenu();
      });
    // from MobileMenu
    this.eventService
      .on<string>(EventName.Event_MobileToggleClicked)
      .subscribe(r => {
        this.toggleMobileMenu();
      });
    // from header
    // this.eventService
    //   .on<IUser>(EventName.Event_LoggedInUserChanged)
    this.currentUser$.subscribe(loggedInUser =>
      this.checkShowSettings(loggedInUser)
    );
  }

  checkShowSettings(loggedInUser: IUser) {
    this.isShowSettings =
      loggedInUser && (loggedInUser.isSuperAdmin || loggedInUser.isAdmin);
    if (!this.isShowSettings) {
      this.mobileMenu = Config.MobileMenu.filter(m => m.action !== 'settings');
    } else {
      this.mobileMenu = Config.MobileMenu;
    }
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
