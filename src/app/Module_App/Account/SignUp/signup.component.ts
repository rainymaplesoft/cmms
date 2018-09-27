import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { KeyValue } from '../../../Module_Core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {
  FireAuthService,
  IUser,
  FirebaseDataService,
  IClub
} from '../../../Module_Firebase';
import { Observable, Subscription } from 'rxjs';
import { ClubService } from '../../_Shared';
import RouteName from '../../../routename';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  constructor(
    private dbService: FirebaseDataService,
    private clubService: ClubService,
    private fb: FormBuilder,
    private auth: FireAuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  club: IClub;
  clubId: string;
  user: Observable<IUser>;
  sub: Subscription;
  signupForm: FormGroup;
  genders: KeyValue[] = [
    { key: 1, value: 'Male' },
    { key: 2, value: 'Female' }
  ];
  title = 'Sign Up';
  clubImage: string;

  ngOnInit() {
    this.buildForm();
    // this.clubImage = `assets/img/club/club_entry_${this.club.clubCode}.jpg`;

    this.sub = this.route.queryParams.subscribe(params => {
      this.clubId = params['clubId'] || '';
      this.init(this.clubId);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  init(clubId) {
    if (!this.clubId) {
      this.router.navigate([RouteName.Home]);
      return;
    }
    this.clubService.getClubById(clubId).subscribe((club: IClub) => {
      this.club = club;
      this.clubImage = `url(assets/img/club/club_entry_${club.clubCode}.jpg)`;
      this.title = this.club.clubName;
    });
  }

  signUp(p: any) {
    const userInfo = <IUser>this.signupForm.value;
    if (!userInfo.email || !userInfo.password) {
      return;
    }
    const userCredential$ = this.auth
      .signupWithEmailPassword(userInfo.email, userInfo.password)
      .then(v => console.log(v), e => console.log(e));
    const aa = 1;
    // todo: navigate to club
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log('submitted');
    // this.signUp(null);
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

  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }

  get passwordConfirm() {
    return this.signupForm.get('passwordConfirm');
  }

  get firstName() {
    return this.signupForm.get('firstName');
  }

  get lastName() {
    return this.signupForm.get('lastName');
  }

  get cellPhone() {
    return this.signupForm.get('cellPhone');
  }

  get gender() {
    return this.signupForm.get('gender');
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
}
