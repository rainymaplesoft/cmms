import { Observable } from 'rxjs';
import { HostListener, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  DialogService,
  HttpService,
  ToastrService,
  UtilService,
  ErrorCode
} from '../../Module_Core';
import RouteName from '../../routename';

export interface IFormValidation {
  [key: string]: boolean;
}

export interface IFormConfig {
  [key: string]: IFormFieldConfig;
}

export interface IFormFieldConfig {
  value: any;
  label?: string;
  required?: string;
  disabled?: boolean;
  pattern?: string;
  maxLength?: number;
  minLength?: number;
  message?: string;
  validations?: any[];
}

export class BaseReactiveFormComponent {
  // implements ComponentCanDeactivate
  __formConfig: IFormConfig;
  __formGroup: FormGroup;
  __formControls = {};
  __canDelete: boolean;
  __validator: any = {};
  __isLoading = false;
  subscribedParam: any;

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    private dialog: DialogService,
    protected dataService: HttpService,
    protected fb: FormBuilder,
    protected toastr: ToastrService,
    protected util: UtilService
  ) {}

  __getParameters() {
    return this.route.params;
  }

  __getDate(date: string) {
    if (!date) {
      return null;
    }
    if (date.indexOf('T') > 0) {
      return date.split('T')[0];
    }
    return date;
  }

  __disableSave() {
    if (!this.__formGroup) {
      return true;
    }
    if (this.__formGroup.invalid) {
      return true;
    }
    if (this.__formGroup.pristine && !this.isFormValueChanged()) {
      return true;
    }
    return false;
  }

  /* data access */

  __getData<T>(url: string, func: any) {
    this.dataService.getData<T>(url).subscribe(
      (result: T) => {
        if (!result) {
          this.toastr.error('DIALOG.FAILED_GET_DATA');
          return;
        }
        func(result);
      },
      e => {
        // this.toastr.error('DIALOG.FAILED_GET_DATA');
        this.__handleNotFound();
      }
    );
  }

  __saveData(url: string, data: any, callback) {
    this.dataService.postData<any>(url, data).subscribe(
      result => {
        callback(result);
        this.toastr.success('DIALOG.SAVE_SUCCESS');
      },
      e => {
        console.log(e);
        this.toastr.error('DIALOG.SAVE_FAIL');
      }
    );
  }

  __deleteData(url: string, data: any, callback: any) {
    this.dataService.postData<any>(url, data).subscribe(
      result => {
        this.toastr.success('DIALOG.DELETE_SUCCESS');
        callback(result);
      },
      e => {
        this.toastr.error('DIALOG.DELETE_FAIL');
      }
    );
  }

  /* authentication and authorization */

  get __isSysAdmin(): boolean {
    return false;
  }

  get __isAppAdmin(): boolean {
    return false;
  }

  get __isMobile(): boolean {
    return this.util.isMobile();
  }

  __handleUnauthorized() {
    this.router.navigate([
      RouteName.Exception,
      {
        errorCode: ErrorCode.ServerError,
        navigateRoute: RouteName.Home
      }
    ]);
  }

  __handleNotFound() {
    this.router.navigate([
      RouteName.Exception,
      {
        errorCode: ErrorCode.ServerError,
        navigateRoute: RouteName.Home
      }
    ]);
  }
  /* event handlers */

  __onDelete(callback: any) {
    this.dialog.YesNo('DIALOG.MESSAGE_CONTINUE', callback);
  }

  /* validation */

  __buildFormGroup(entity?: any) {
    const fg = {};

    // tslint:disable-next-line:forin
    for (const key in this.__formConfig) {
      const setting = this.__formConfig[key];
      const valueObject = [
        { value: setting.value, disabled: setting.disabled },
        setting.validations
      ];
      fg[key] = valueObject;
    }
    this.__formGroup = this.fb.group(fg);
    this.buildValidationMessages(this.__formGroup.controls);
    this.createFormControls();
  }

  buildValidationMessages(controls) {
    // tslint:disable-next-line:forin
    for (const key in controls) {
      const control = controls[key];
      control.valueChanges.subscribe(v => this.setMessage(control, key));
    }
  }
  setMessage(c: AbstractControl, key: string) {
    const field = this.__formConfig[key];
    if (!field) {
      return;
    }
    field.message = '';
    if ((c.touched || c.dirty) && c.errors) {
      // field.message = Object.keys(c.errors).map(k => field[k]).join(', ');
      // display only the first one
      field.message = Object.keys(c.errors).map(k => field[k])[0];
    }
  }

  createFormControls() {
    Object.keys(this.__formGroup.controls).map(k => {
      const value = this.__formGroup.controls[k].value;
      this.__formControls[k] = value;
    });
  }

  isFormValueChanged() {
    let ischanged = false;
    Object.keys(this.__formGroup.controls).map(k => {
      const value = this.__formGroup.controls[k].value;
      if (this.__formControls[k] !== value) {
        ischanged = true;
      }
    });
    return ischanged;
  }

  /* route guard */

  canDeactivate(): Observable<boolean> | boolean {
    // false: show confirm
    return !this.__formGroup || this.__formGroup.pristine;
    // or return a function to check extra conditions
  }

  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.canDeactivate()) {
      // This message is displayed to the user in IE and Edge when they navigate without using
      // Angular routing (type another URL/close the browser/etc)
      $event.returnValue = 'Confirm before leave.';
    }
  }
}
