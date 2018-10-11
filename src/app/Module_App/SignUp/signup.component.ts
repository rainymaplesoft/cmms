import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  KeyValue,
  pullLeftRightAnimate,
  ToastrService,
  DialogYesNoComponent,
  DialogConfirm,
  UtilService
} from '../../Module_Core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FireAuthService, IUser, IClub } from '../../Module_Firebase';
import { Observable, Subscription, of } from 'rxjs';
import RouteName from '../../routename';
import { MetaService } from '../meta.service';
import { Config } from '../config';
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
    private dbService: FirebaseDataService,
    private fb: FormBuilder,
    private authService: FireAuthService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private util: UtilService
  ) {}

  club: IClub;
  signupForm: FormGroup;
  genders: KeyValue[];
  loginInfo = { email: '', password: '' };
  showLogin = true;
  title = 'Sign Up / Sign In';
  clubImage: string;

  get clubId() {
    return this.metaService.getUrlClubId();
  }

  ngOnInit() {
    this.init();
    this.genders = Config.Gender;
    this.buildForm();
  }

  init() {
    this.metaService.getClubById(this.clubId).subscribe((club: IClub) => {
      if (!club) {
        this.router.navigate([RouteName.Home]);
        return;
      }
      this.club = club;
      this.clubImage = `url(assets/img/club/club_entry_${club.clubCode}.jpg)`;
    });
  }

  onSubmit() {
    this.signUp(null);
  }

  onLogin() {
    this.authService.signOut();
    this.authService
      .login(this.clubId, this.loginInfo.email, this.loginInfo.password)
      .then(user => this.afterSignIn(user));
  }

  onForget() {
    const email = this.loginInfo.email;
    if (!email || !this.util.validateEmail(email)) {
      this.toastr.warning('Please enter valid email address');
      return;
    }
    const msg = 'Do you really want to reset you passwor?';
    const dialogRef = this.dialog.open(DialogYesNoComponent, {
      data: { message: msg }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === DialogConfirm.Yes) {
        this.authService.resetPassword().subscribe(r => {
          this.toastr.success('Reset password request sent successfully');
        });
      }
    });
  }

  private signUp(p: any) {
    const userInfo = <IUser>this.signupForm.value;
    if (!userInfo.email || !userInfo.password) {
      return;
    }
    this.authService.signOut();
    this.authService
      .signupWithEmailPassword(this.clubId, userInfo)
      .then(user => this.afterSignIn(user));
  }

  private afterSignIn = (user: Observable<IUser>) => {
    user.subscribe(u => {
      if (u) {
        // navigate to club page after login successfully
        this.router.navigate([RouteName.Club], {
          queryParams: { clubId: this.clubId }
        });
      } else {
        this.toastr.error('Email or password is incorrect for this club');
      }
    });
  };

  onToggleSign() {
    this.showLogin = !this.showLogin;
  }

  //#region reactive form and field getters

  private buildForm() {
    this.signupForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email]
        // [CustomValidator.ExistingEmail(this.dbService)]
      ],
      password: [
        '',
        [Validators.minLength(6), Validators.maxLength(25), Validators.required]
      ],
      passwordConfirm: [
        '',
        [Validators.minLength(6), Validators.maxLength(25), Validators.required]
      ],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      cellPhone: ['', [Validators.required]],
      gender: 1
    });
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
