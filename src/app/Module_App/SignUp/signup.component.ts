import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  KeyValue,
  pullLeftRightAnimate,
  ToastrService
} from '../../Module_Core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FireAuthService, IUser, IClub } from '../../Module_Firebase';
import { Observable, Subscription, of } from 'rxjs';
import RouteName from '../../routename';
import { MetaService } from '../meta.service';
import { switchMap, tap } from 'rxjs/operators';
import { Config } from '../config';

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
    private authService: FireAuthService,
    private router: Router,
    private toastr: ToastrService
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
        console.warn('signup: clubId is null or club is null');
        return;
      }
      this.club = club;
      this.clubImage = `url(assets/img/club/club_entry_${club.clubCode}.jpg)`;
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log('submitted');
    this.signUp(null);
  }

  onLogin() {
    this.authService.signOut();
    this.authService
      .login(this.clubId, this.loginInfo.email, this.loginInfo.password)
      .then(user => this.afterSignIn(user));
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
      email: ['', [Validators.required, Validators.email]],
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
