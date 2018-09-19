import { Component, OnInit } from '@angular/core';
import { BaseReactiveFormComponent } from 'src/app/Module_Shared';
import { Router, ActivatedRoute } from '@angular/router';
import {
  DialogService,
  HttpService,
  ToastrService,
  StorageService,
  UtilService,
  FireAuthService,
  IUser,
  KeyValue
} from '../../../Module_Core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, DateAdapter, NativeDateAdapter } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss']
})
export class SignUpComponent extends BaseReactiveFormComponent
  implements OnInit {
  constructor(
    router: Router,
    route: ActivatedRoute,
    dialog: DialogService,
    util: UtilService,
    dataService: HttpService,
    fb: FormBuilder,
    toastr: ToastrService,
    private auth: FireAuthService,
    private popup: MatDialog,
    private storeServie: StorageService,
    dateAdapter: DateAdapter<NativeDateAdapter>
  ) {
    super(router, route, dialog, dataService, fb, toastr, util);
  }

  user: IUser;
  genders: KeyValue[] = [
    { key: 1, value: 'Male' },
    { key: 2, value: 'Female' }
  ];
  title = 'Sign Up';

  ngOnInit() {
    this.user = {
      uid: '',
      email: '',
      password: '',
      passwordConfirm: '',
      cellPhone: '',
      firstName: '',
      lastName: '',
      gender: 1
    };
    this.buildForm(this.user);
  }

  signUp(p: any) {
    const userInfo = <IUser>this.__formGroup.value;
    if (!userInfo.email || !userInfo.password) {
      return;
    }
    const userCredential$ = this.auth
      .signupWithEmailPassword(userInfo.email, userInfo.password)
      .then(v => console.log(v), e => console.log(e));
    const aa = 1;
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn('submitted');
  }

  //#region getters
  get email() {
    return this.__formGroup.get('email');
  }
  get password() {
    return this.__formGroup.get('password');
  }

  get passwordConfirm() {
    return this.__formGroup.get('passwordConfirm');
  }

  get firstName() {
    return this.__formGroup.get('firstName');
  }

  get lastName() {
    return this.__formGroup.get('lastName');
  }

  get cellPhone() {
    return this.__formGroup.get('cellPhone');
  }

  get gender() {
    return this.__formGroup.get('gender');
  }
  get notSamePassword() {
    return (
      this.password.valid &&
      this.password.touched &&
      this.passwordConfirm.valid &&
      this.passwordConfirm.touched &&
      this.password.value !== this.passwordConfirm.value
    );
  }
  //#endregion

  /* build form and validations */
  buildForm(c: IUser) {
    this.__formConfig = {
      uid: { value: c.uid },
      email: {
        value: c.email,
        validations: [Validators.required, Validators.email],
        message: 'Email format is invalid'
      },
      password: {
        value: c.password,
        validations: [
          // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(25),
          Validators.required
        ],
        message: 'Password is required with length between 6-25 characters'
      },
      passwordConfirm: {
        value: c.passwordConfirm,
        validations: [
          // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(25),
          Validators.required
        ],
        message: 'Password is required with length between 6-25 characters'
      },
      firstName: {
        value: c.firstName,
        validations: [Validators.required],
        message: 'First Name is required'
      },
      lastName: {
        value: c.firstName,
        validations: [Validators.required],
        message: 'Last Name is required'
      },
      cellPhone: {
        value: c.cellPhone,
        validations: [Validators.required],
        message: 'Last Name is required'
      },
      gender: {
        value: c.gender,
        validations: [Validators.required, Validators.min(1)],
        message: 'Please select gender'
      }
    };
    this.__buildFormGroup();
  }
}
