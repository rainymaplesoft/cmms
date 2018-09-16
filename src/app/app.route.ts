import { Route } from '@angular/router';

import RouteName from './routename';
import { ExceptionComponent } from './Module_Core';
import { AppComponent } from './app.component';
import { SignUpComponent } from './Module_App/Account/SignUp/signup.component';
import { LandingComponent } from './Module_App/Landing/landing.component';
// RouteName.DefaultRoute
export const AppRoutes: Route[] = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  {
    path: 'welcome',
    component: LandingComponent,
    canActivate: []
  },
  { path: 'signup', component: SignUpComponent },
  { path: RouteName.Exception, component: ExceptionComponent, canActivate: [] }
];

export const AppComponents: any = [
  AppComponent,
  SignUpComponent,
  LandingComponent
];
