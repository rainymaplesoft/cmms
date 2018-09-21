import { IMenuItem } from './Module_Core';

export class RouteName {
  get default() {
    return '';
  }
  static Home = 'home';
  static SignIn = 'signin';
  static SignUp = 'signup';
  static Event = 'event';
  static Exception = 'Exception';

  static GeoInfo = 'geoinfo';
  static GeoSchoolInfo = 'schoolinfo';

  static Terminology = 'i18n';
  static TermsEdit = 'termsedit';
  static EditClient = 'editclient';
  static ManageTerm = 'manageterm';

  static DefaultRoute = RouteName.SignUp;
}
export default RouteName;

export const MobileMenu: IMenuItem[] = [
  {
    menu_text: 'Home',
    action: RouteName.Home
  },
  {
    menu_text: 'Settings',
    action: '',
    sub_menu: [
      {
        menu_text: 'Setting-1'
      },
      {
        menu_text: 'Setting-2'
      }
    ]
  },
  {
    menu_text: 'Gallery',
    action: RouteName.SignUp
  },
  {
    menu_text: 'Events',
    sub_menu: [
      {
        menu_text: 'Event-1',
        action: RouteName.Event
      },
      {
        menu_text: 'Event-2',
        action: 'wrong route name!'
      }
    ]
  }
];
