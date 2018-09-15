import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
// import {toastr} from 'toastr';
import { TranslateService } from '@ngx-translate/core';

declare let toastr: any;

@Injectable()
export class ToastrService {
  constructor(private translate: TranslateService) {
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: 'toast-bottom-center',
      preventDuplicates: false,
      onclick: null,
      showDuration: '300',
      hideDuration: '1000',
      timeOut: '2000',
      extendedTimeOut: '1000',
      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut',
      rtl: false
    };
  }
  success(message: string, title?: string) {
    this.translate.get([message]).subscribe(m => {
      toastr.success(m[message], title);
    });
  }

  warning(message: string, title?: string) {
    this.translate.get([message]).subscribe(m => {
      toastr.warning(m[message], title);
    });
  }

  error(message: string, title?: string) {
    this.translate.get([message]).subscribe(m => {
      toastr.error(m[message], title);
    });
  }
}
