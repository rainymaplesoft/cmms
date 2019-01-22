import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  pullLeftRightAnimate,
  ToastrService,
  DialogYesNoComponent,
  DialogConfirm,
  UtilService
} from '../../Module_Core';
import {
  FireAuthService,
  IUser,
  IClub,
  FirebaseDataService
} from '../../Module_Firebase';
import { Observable, Subscription, of } from 'rxjs';
import RouteName from '../../routename';
import { MetaService } from '../meta.service';
import { MatDialog } from '@angular/material';
import { CustomValidator } from '../_shared/validators';
import { take, map } from 'rxjs/operators';
import { ClubService } from '../_shared';
import { AccountService } from '../_shared/account.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'signin',
  templateUrl: 'signin.component.html',
  styleUrls: ['signup.component.scss'],
  animations: [pullLeftRightAnimate]
})
export class SignInComponent implements OnInit {
  constructor(
    private metaService: MetaService,
    private authService: FireAuthService,
    private clubService: ClubService,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
    private dbService: FirebaseDataService,
    public dialog: MatDialog,
    private util: UtilService
  ) { }

  club: IClub;
  loginInfo = {
    email: '',
    password: '',
    isJoinClub: true,
    isFollowPolicy: true
  };
  showLogin = true;
  title = 'Sign In';
  clubId = '';
  clubImage: string;
  subLogin: Subscription;

  ngOnInit() {
    this.clubId = this.metaService.getUrlClubId();
    this.clubService.getClubById(this.clubId).subscribe(
      (club: IClub) => {
        if (!club) {
          this.router.navigate([RouteName.Home]);
          return;
        }
        this.club = club;
        this.clubImage = `url(assets/img/club/club_entry_${club.clubCode}.jpg)`;
      },
      e => {
        this.router.navigate([RouteName.Home]);
        return;
      }
    );
  }

  onLogin() {
    this.subLogin = this.accountService
      .getClubUserByEmail(this.clubId, this.loginInfo.email)
      .subscribe((existingUser: IUser) => {
        const isNew = !existingUser;
        if (
          existingUser &&
          !existingUser.isActive &&
          !existingUser.isAdmin &&
          !existingUser.isSuperAdmin
        ) {
          this.toastr.warning('Sorry, this email is invalid for this club');
          this.subLogin.unsubscribe();
          return;
        }
        this.authService.signOut();
        this.authService
          .login(
            this.clubId,
            this.loginInfo.email,
            this.loginInfo.password,
            isNew
          )
          .then(user => this.afterSignIn(user));
      });
  }

  onForget() {
    const email = this.loginInfo.email;
    if (!email || !this.util.validateEmail(email)) {
      this.toastr.warning('Please enter valid email address');
      return;
    }
    CustomValidator.CheckEmailExisting(this.dbService, email).subscribe(
      isExisting => {
        if (!isExisting) {
          this.toastr.warning(
            'No account with this email address, please verify'
          );
          return;
        }
        this.sendForgetEmailRequest(email);
      }
    );
  }

  private sendForgetEmailRequest(email: string) {
    const msg = 'Do you really want to reset you password?';
    const dialogRef = this.dialog.open(DialogYesNoComponent, {
      data: { message: msg }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === DialogConfirm.Yes) {
        this.authService.resetPassword(email);
        this.toastr.success('Reset password request sent successfully');
      }
    });
  }

  private afterSignIn = (user$: Observable<IUser>) => {
    user$.subscribe(user => {
      if (!user) {
        this.toastr.error('Email or password is incorrect for this club');
        this.subLogin.unsubscribe();
        return;
      }

      // this.accountService.updateUserLoginInfo(user);
      // navigate to club page after login successfully
      this.router.navigate([RouteName.Club], {
        queryParams: { clubId: this.clubId }
      });
    });

    this.subLogin.unsubscribe();
  }

  disableSign() {
    return (
      !this.loginInfo.email ||
      !this.loginInfo.password ||
      !this.loginInfo.isJoinClub ||
      !this.loginInfo.isFollowPolicy
    );
  }
}
