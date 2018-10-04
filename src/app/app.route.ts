import { Route } from '@angular/router';

import RouteName from './routename';
import { ExceptionComponent, IMenuItem } from './Module_Core';
import { AppComponent } from './app.component';
import { LandingComponent } from './Module_App/Landing/landing.component';
import { HeaderComponent } from './Module_App/Header/header.component';
import { ClubListComponent, ClubEditComponent } from './Module_App/Club';
import { ClubSelectComponent } from './Module_App/Landing';
import { HeaderInfoComponent } from './Module_App/HeaderInfo/header-info.component';
import {
  AccountEditComponent,
  AccountListComponent
} from './Module_App/Account';
import { UserComponent } from './Module_App/Account/User/user.component';
import { EventLatestComponent } from './Module_App/Events';
import { PricingComponent } from './Module_App/Pricing';
import { SignUpComponent } from './Module_App/SignUp';
import { ViewHeaderComponent } from './Module_App/ViewHeader';
import { ClientComponent } from './Module_App/_Clients/client.component';
import {
  MainWIBCComponent,
  MainLPBCComponent,
  MainLVBCComponent
} from './Module_App/_Clients';
import { FooterComponent } from './Module_App/Footer/footer.component';
import { DaySelectorComponent } from 'src/app/Module_App/_shared';

// RouteName.DefaultRoute
/* to avoid any error in production (ng build --prod)
  1. "path" value must be a string (like 'home'), rather than a const value
  2. "redirectTo" value must have a slash (like '/home')
*/

export const AppRoutes: Route[] = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'setting/club', component: ClubListComponent, canActivate: [] },
  { path: 'setting/account', component: AccountListComponent, canActivate: [] },
  { path: 'exception', component: ExceptionComponent, canActivate: [] },
  {
    path: 'club',
    component: ClientComponent,
    canActivate: [],
    children: [
      { path: 'sign', component: SignUpComponent },
      { path: 'user', component: UserComponent }
    ]
  },
  { path: '**', redirectTo: '/home' }
];
// { path: '**', component: ExceptionComponent }

export const AppComponents: any = [
  AppComponent,
  LandingComponent,
  HeaderComponent,
  HeaderInfoComponent,
  ClubListComponent,
  ClubEditComponent,
  ClubSelectComponent,
  AccountEditComponent,
  AccountListComponent,
  UserComponent,
  EventLatestComponent,
  PricingComponent,
  SignUpComponent,
  ViewHeaderComponent,
  ClientComponent,
  MainLPBCComponent,
  MainLVBCComponent,
  MainWIBCComponent,
  FooterComponent,
  DaySelectorComponent
];
