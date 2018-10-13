import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  pullLeftRightAnimate,
  ToastrService,
  DialogYesNoComponent,
  DialogConfirm,
  UtilService
} from '../../Module_Core';
import { FireAuthService, IUser, IClub } from '../../Module_Firebase';
import { Observable, Subscription, of } from 'rxjs';
import RouteName from '../../routename';
import { MetaService } from '../meta.service';
import { MatDialog } from '@angular/material';

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
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private util: UtilService
  ) {}

  club: IClub;
  loginInfo = { email: '', password: '' };
  showLogin = true;
  title = 'Sign In';
  clubImage: string;

  get clubId() {
    return this.metaService.getUrlClubId();
  }

  ngOnInit() {
    this.metaService.getClubById(this.clubId).subscribe((club: IClub) => {
      if (!club) {
        this.router.navigate([RouteName.Home]);
        return;
      }
      this.club = club;
      this.clubImage = `url(assets/img/club/club_entry_${club.clubCode}.jpg)`;
    });
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
}
