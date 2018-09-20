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
