export class RouteName {
  get default() {
    return '';
  }
  static Home = '';

  static Landing = 'landing';
  static SignIn = 'signin';
  static SignUp = 'signup';
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