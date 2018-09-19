import { Route } from '@angular/router';

import RouteName from './routename';
import { ExceptionComponent } from './Module_Core';
import { AppComponent } from './app.component';
import { SignUpComponent } from './Module_App/Account/SignUp/signup.component';
import { LandingComponent } from './Module_App/Landing/landing.component';
import { HeaderComponent } from './Module_App/Header/header.component';
import { HeaderInfoComponent } from './Module_App/HeaderInfo/header-info.component';
import { ViewHeaderComponent } from './Module_App/ViewHeader/view-header.component';
// RouteName.DefaultRoute
export const AppRoutes: Route[] = [
  { path: '', redirectTo: RouteName.Home, pathMatch: 'full' },
  {
    path: RouteName.Home,
    component: LandingComponent,
    canActivate: []
  },
  { path: RouteName.SignUp, component: SignUpComponent },
  { path: RouteName.Exception, component: ExceptionComponent, canActivate: [] }
];

export const AppComponents: any = [
  AppComponent,
  SignUpComponent,
  LandingComponent,
  HeaderComponent,
  HeaderInfoComponent,
  ViewHeaderComponent
];
