import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { fromEvent } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

export interface IWindowResizeInfo {
  isLessThanBreakpoint: boolean;
  width?: number;
  isCrossed?: boolean;
}

export interface ILayoutService {
  windowResize(breakpoint: number): Observable<IWindowResizeInfo>;
  toastr(message: string, duration: number): void;
}

@Injectable()
export class LayoutService implements ILayoutService {
  private _window_privious_width: number;

  constructor(private snackBar: MatSnackBar) {}

  /*
      === useage ===

      windowSubscription: Subscription;
      ngOnInit() {
          this.windowSubscription = this.layoutService.windowResize(this.windowBreakpoint).subscribe(windowInfo => {
              this.setLayout(windowInfo);
          });
      }
      ngOnDestroy(): void {
          this.windowSubscription.unsubscribe();
      }
   */
  public windowResize(breakpoint: number = 960): Observable<IWindowResizeInfo> {
    const windowInfo = fromEvent(window, 'resize').pipe(
      map(e => {
        return {
          width: window.innerWidth,
          isLessThanBreakpoint: false,
          isCrossed: false
        };
      }),
      tap(value => {
        const isLessThanBreakpoint = this._window_privious_width < breakpoint;

        value.isCrossed =
          (isLessThanBreakpoint && window.innerWidth >= breakpoint) ||
          (!isLessThanBreakpoint && window.innerWidth < breakpoint);
        value.isLessThanBreakpoint = window.innerWidth < breakpoint;

        this._window_privious_width = window.innerWidth;
      }),
      filter(value => value.isCrossed)
    );

    return windowInfo;
  }

  public toastr = (message: string, duration: number = 2000) => {
    this.snackBar.open(message, null, {
      duration: duration
    });
  };
}
