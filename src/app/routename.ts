import { IMenuItem } from './Module_App/_shared';

export class RouteName {
  get default() {
    return '';
  }
  static Home = 'home';
  static Club = 'club';
  static SignIn = `signin`;
  static SignUp = `signup`;
  static Event = 'event';
  static ClubSetting = 'setting/club';
  static AccountSetting = 'setting/account';
  static BookingSetting = 'setting/booking';
  static User = `setting/user`;
  static Exception = 'Exception';

  static GeoSchoolInfo = 'schoolinfo';

  static Terminology = 'i18n';
  static TermsEdit = 'termsedit';
  static EditClient = 'editclient';
  static ManageTerm = 'manageterm';

  static DefaultRoute = RouteName.Home;
}
export default RouteName;
