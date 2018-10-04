import { KeyValue } from '../Module_Core/enums';
export enum ClubClient {
  LPBC = 'LPBC',
  LVBC = 'LVBC',
  WIBC = 'WIBC'
}

export enum ClaimType {
  Supervisor = '',
  Admin = 'Admin',
  Member = 'Member',
  Guest = 'Guest'
}

export enum EventName {
  Event_HideClubMainContent = 'Event_HideClubMainContent',
  Event_MobileToggleClicked = 'Event_MobileToggleClicked',
  Event_MenuItemClicked = 'Event_MenuItemClicked',
  Event_SignIn = 'Event_SignIn',
  Event_SignOut = 'Event_SignOut'
}
