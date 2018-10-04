import { IMenuItem } from './Module_Core';

export class RouteName {
  get default() {
    return '';
  }
  static Home = 'home';
  static Club = 'club';
  static Sign = `${RouteName.Club}/sign`;
  static User = `${RouteName.Club}/user`;
  static Event = 'event';
  static ClubSetting = 'setting/club';
  static AccountSetting = 'setting/account';
  static BookingSetting = 'setting/booking';
  static Exception = 'Exception';

  static GeoSchoolInfo = 'schoolinfo';

  static Terminology = 'i18n';
  static TermsEdit = 'termsedit';
  static EditClient = 'editclient';
  static ManageTerm = 'manageterm';

  static DefaultRoute = RouteName.Home;
}
export default RouteName;

export const MobileMenu: IMenuItem[] = [
  { menu_text: 'Home', action: RouteName.Home },
  {
    menu_text: 'Settings',
    action: '',
    sub_menu: [
      { menu_text: 'Club Settings', action: RouteName.ClubSetting },
      { menu_text: 'Account Settings', action: RouteName.AccountSetting }
    ]
  },
  { menu_text: 'Gallery', action: RouteName.Home },
  {
    menu_text: 'Events',
    sub_menu: [
      { menu_text: 'Event-1', action: RouteName.Event },
      { menu_text: 'Event-2', action: 'wrong route name!' }
    ]
  }
];
