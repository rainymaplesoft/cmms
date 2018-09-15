import { Route } from '@angular/router';

import RouteName from './routename';
import { ExceptionComponent } from './Module_Core';

export const AppRoutes: Route[] = [
  { path: '', redirectTo: RouteName.DefaultRoute, pathMatch: 'full' },
  {
    path: RouteName.Home,
    redirectTo: RouteName.DefaultRoute,
    pathMatch: 'full',
    canActivate: []
  },
  { path: RouteName.Exception, component: ExceptionComponent }
];

export const AppComponents: any = [];
