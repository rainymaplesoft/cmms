import {
  CanDeactivate,
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UtilService } from '../Module_Core/services';
import { ErrorCode } from '../Module_Core';

export class AppClaim {
  claimId: number;
  userId: number;
  claimType = '';
  claimValue = '';
}
export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class PendingChangesGuard
  implements CanDeactivate<ComponentCanDeactivate> {
  label_Warning = 'DIALOG.LEAVE_WARNING';
  constructor(private util: UtilService) {
    this.util.translate(this.label_Warning).subscribe(texts => {
      this.label_Warning = texts[this.label_Warning];
    });
  }
  canDeactivate(
    component: ComponentCanDeactivate
  ): Observable<boolean> | Promise<boolean> | boolean {
    // if there are no pending changes, just allow deactivation; else confirm first
    return component.canDeactivate()
      ? true
      : // NOTE: this warning message will only be shown when navigating elsewhere within your angular app;
        // when navigating away from your angular app, the browser will show a generic warning message
        // see http://stackoverflow.com/a/42207299/7307355
        confirm(this.label_Warning);
  }
}

function isDebug() {
  const origin = window.location.origin;
  return origin.indexOf(':4200') > 0;
}
