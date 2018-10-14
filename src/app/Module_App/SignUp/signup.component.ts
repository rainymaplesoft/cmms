import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { pullLeftRightAnimate } from '../../Module_Core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FireAuthService, IUser, IClub } from '../../Module_Firebase';
import RouteName from '../../routename';
import { MetaService } from '../meta.service';
import { MatDialog } from '@angular/material';
import { CustomValidator } from '../_shared';
import { FirebaseDataService } from '../../Module_Firebase/firebase.data.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss'],
  animations: [pullLeftRightAnimate]
})
export class SignUpComponent implements OnInit {
  constructor(
    private metaService: MetaService,
    private fb: FormBuilder,
    private dbService: FirebaseDataService,
    private authService: FireAuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  club: IClub;
  signupForm: FormGroup;
  title = 'Sign Up';
  clubImage: string;

  get clubId() {
    return this.metaService.getUrlClubId();
  }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {
    this.signUp(null);
  }

  private signUp(p: any) {
    const userInfo = <IUser>this.signupForm.value;
    if (!userInfo.email || !userInfo.password) {
      return;
    }
    this.authService.signOut();
    this.authService
      .signupWithEmailPassword(userInfo)
      .then(_ => this.router.navigate([RouteName.Home]));
  }

  //#region reactive form and field getters

  private buildForm() {
    this.signupForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email],
        [CustomValidator.ExistingEmail(this.dbService)]
      ],
      password: [
        '',
        [Validators.minLength(6), Validators.maxLength(25), Validators.required]
      ],
      passwordConfirm: [
        '',
        [Validators.minLength(6), Validators.maxLength(25), Validators.required]
      ],
      agreePolicy: [false]
    });
  }

  isAgreePolicy() {
    return this.signupForm.get('agreePolicy').value;
  }

  getValidate(control: string) {
    const ctrl = this.signupForm.get(control);
    if (!ctrl) {
      return true;
    }
    return ctrl.invalid && ctrl.dirty;
  }

  get email() {
    return this.signupForm.get('email');
  }

  get notSamePassword() {
    const password = this.signupForm.get('password');
    const passwordConfirm = this.signupForm.get('passwordConfirm');
    return (
      password.valid &&
      password.touched &&
      passwordConfirm.valid &&
      passwordConfirm.touched &&
      password.value !== passwordConfirm.value
    );
  }

  //#endregion
}
