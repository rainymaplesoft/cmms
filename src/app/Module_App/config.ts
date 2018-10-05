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
  Event_MetaInfoChanged = 'Event_MetaInfoChanged',
  Event_HideClubMainContent = 'Event_HideClubMainContent',
  Event_MobileToggleClicked = 'Event_MobileToggleClicked',
  Event_MenuItemClicked = 'Event_MenuItemClicked',
  Event_SignIn = 'Event_SignIn',
  Event_SignOut = 'Event_SignOut'
}

export class DateConst {
  static monthes = 'Jan-Feb-Mar-Apr-May-Jun-Jul-Aug-Sep-Oct-Nov-Dec'.split('-');
  static weekdays = 'Sunday-Monday-Tuesday-Wednesday-Thursday-Friday-Saturday'.split(
    '-'
  );
}
