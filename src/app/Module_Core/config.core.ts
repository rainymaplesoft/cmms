// __rootpath__ should be defined in MVC root view (index.html)
// e.g. <script>var __rootpath__ = '@ViewBag.rootPath';</script>
// its values should be the same as the "href" of "base tag"
// it should look like "/CORE/"
declare let __rootpath__: any;
declare let __clientName__: any;

export class Config {
  static ApiUrl = Config.getBaseUri();

  static get client() {
    if (typeof __clientName__ === 'undefined') {
      // return 'eaq';
      return 'moro';
    }
    return __clientName__;
  }

  static get i18nRoot() {
    return 'i18n';
  }

  static getLanguage(lang: string) {
    let language = 'english';
    switch (lang) {
      case 'en':
        break;
      case 'fr':
        language = 'french';
        break;
      case 'ar':
        language = 'arabic';
        break;
      default:
        language = 'english';
        break;
    }
    return language;
  }
  static getBaseUri() {
    let baseUri = '';
    if (typeof __rootpath__ === 'undefined') {
      // be carefule that IE won't work with ".baseURI" property
      baseUri = document.baseURI;
    } else {
      baseUri = __rootpath__;
    }
    // for debugging with VSCode
    if (baseUri === undefined || baseUri === 'http://localhost:4200/') {
      // for IIS
      // baseUri = "http://localhost:8088/SAS/";

      // for IIS Express debugging
      baseUri = 'http://localhost:18661/';
    }
    return baseUri;
  }
}
