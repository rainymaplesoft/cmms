import { Route } from '@angular/router';

import RouteName from './routename';
import { ExceptionComponent, IMenuItem } from './Module_Core';
import { AppComponent } from './app.component';
import { LandingComponent } from './Module_App/Landing/landing.component';
import { HeaderComponent } from './Module_App/Header/header.component';
import { ClubListComponent, ClubEditComponent } from './Module_App/Club';
import { ClubSelectComponent } from './Module_App/Landing';
import { HeaderInfoComponent } from './Module_App/HeaderInfo/header-info.component';

// RouteName.DefaultRoute
/* to avoid any error in production (ng build --prod)
  1. "path" value must be a string (like 'home'), rather than a const value
  2. "redirectTo" value must have a slash (like '/home')
*/

export const AppRoutes: Route[] = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent },
  { path: 'setting/club', component: ClubListComponent, canActivate: [] },
  { path: 'exception', component: ExceptionComponent, canActivate: [] },
  { path: 'club', loadChildren: './Module_Client/client.module#ClientModule' },
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
  ClubSelectComponent
];
