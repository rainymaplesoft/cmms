import { KeyValue } from '../Module_Core/enums';
import { IMenuItem } from './_shared';
import RouteName from '../routename';

export class Config {
  static Gender: KeyValue[] = [
    { key: 1, value: 'Male' },
    { key: 2, value: 'Female' }
  ];

  static Monthes = 'Jan-Feb-Mar-Apr-May-Jun-Jul-Aug-Sep-Oct-Nov-Dec'.split('-');
  static Weekdays = 'Sunday-Monday-Tuesday-Wednesday-Thursday-Friday-Saturday'.split(
    '-'
  );

  static PageConfig = {
    length: 0,
    pageSize: 5,
    pageIndex: 0,
    pageSizeOptions: [5, 10, 20]
  };

  static ValidatorError = {
    emailExists: { emailExists: true }
  };

  static MobileMenu: IMenuItem[] = [
    { menu_text: 'Home', action: RouteName.Home },
    {
      menu_text: 'Settings',
      action: 'settings',
      sub_menu: [
        { menu_text: 'Club', action: RouteName.ClubSetting },
        { menu_text: 'Member', action: RouteName.AccountSetting },
        { menu_text: 'Booking', action: RouteName.BookingSetting }
      ]
    },
    // { menu_text: 'Gallery', action: RouteName.Home },
    { menu_text: 'Sign Up', action: RouteName.SignUp },
    {
      menu_text: 'Events',
      action: 'events',
      sub_menu: [
        { menu_text: 'Event-1', action: RouteName.Event },
        { menu_text: 'Event-2', action: 'wrong route name!' }
      ]
    }
  ];
}

export enum ValidatorError {
  EMAIL_EXIST = 'EMAIL_EXIST'
}

export enum ClubClient {
  LPBC = 'LPBC',
  LVBC = 'LVBC',
  WIBC = 'WIBC'
}

export enum Sorting {
  ASC = 'ASC',
  DESC = 'DESC'
}

export enum ClaimType {
  Supervisor = '',
  Admin = 'Admin',
  Member = 'Member',
  Guest = 'Guest'
}

export enum EventName {
  Event_MetaInfoChanged = 'Event_MetaInfoChanged',
  Event_HideClubMainContent = 'Event_HideClubMainContent',
  Event_MobileToggleClicked = 'Event_MobileToggleClicked',
  Event_MenuItemClicked = 'Event_MenuItemClicked',
  Event_LoggedInUserChanged = 'Event_LoggedInUserChanged',
  Event_SignIn = 'Event_SignIn',
  Event_SignOut = 'Event_SignOut'
}
