import { Route } from '@angular/router';

import RouteName from './routename';
import { ExceptionComponent, IMenuItem } from './Module_Core';
import { AppComponent } from './app.component';
import { SignUpComponent } from './Module_App/Account/SignUp/signup.component';
import { LandingComponent } from './Module_App/Landing/landing.component';
import { HeaderComponent } from './Module_App/Header/header.component';
import { HeaderInfoComponent } from './Module_App/HeaderInfo/header-info.component';
import { ViewHeaderComponent } from './Module_App/ViewHeader/view-header.component';
import { EventComponent } from './Module_App/Events/event.component';
import { ClubListComponent, ClubEditComponent } from './Module_App/Club';

// RouteName.DefaultRoute
/* to avoid any error in production (ng build --prod)
  1. "path" value must be a string (like 'home'), rather than a const value
  2. "redirectTo" value must have a slash (like '/home')
*/

export const AppRoutes: Route[] = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'event', component: EventComponent },
  { path: 'clubs', component: ClubListComponent, canActivate: [] },
  { path: 'signup', component: SignUpComponent },
  { path: 'exception', component: ExceptionComponent, canActivate: [] },
  { path: '**', redirectTo: '/home' }
];
// { path: '**', component: ExceptionComponent }

export const AppComponents: any = [
  AppComponent,
  SignUpComponent,
  LandingComponent,
  HeaderComponent,
  HeaderInfoComponent,
  ViewHeaderComponent,
  EventComponent,
  ClubListComponent,
  ClubEditComponent
];
