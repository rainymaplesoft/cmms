import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { slideInDownAnimation } from '../../animation/';
import { ErrorCode } from '../../enums';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'not-found',
  templateUrl: './exception.component.html',
  styleUrls: ['./exception.component.scss'],
  animations: [slideInDownAnimation]
})

export class ExceptionComponent {
  errorCode = '404';
  message = 'Page Not Found';
  navigateRoute = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.errorCode = params['errorCode'];
      this.navigateRoute = params['navigateRoute'];
      switch (this.errorCode) {
        case ErrorCode.NotFound:            // 404
          this.message = 'Page Not Found';
          break;
        case ErrorCode.Unauthorized:        // 401,403
          this.message = 'Unauthorized';
          break;
        default:                            // 500
          this.message = 'Server Error';
          this.errorCode = '500';
          break;
      }
    });
  }
  navigateHome() {
    if (this.navigateRoute) {
      this.router.navigate([this.navigateRoute]);
    } else {
      this.router.navigate(['']);
    }
  }
}
