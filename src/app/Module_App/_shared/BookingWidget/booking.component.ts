import { Component, OnInit, OnDestroy } from '@angular/core';
import { IClub, IBooking, IUser } from '../../../Module_Firebase/models';
import { BookingService } from '../booking.service';
import { tap, take, switchMap } from 'rxjs/operators';
import { MetaService } from '../../meta.service';
import { UtilService } from '../../../Module_Core';
import { ClubService } from '../club.service';
import { AccountService } from '../account.service';
import { Subscription, Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { AppState } from '../../app.store';

@Component({
  selector: 'app-booking',
  template: `
      <div class="booking-list" *ngIf='bookingList'>
        <div class="li"  *ngFor='let booking of bookingList; index as i;'>
          <booing-widget [booking]='booking' [loggedinUser]='user'></booing-widget>
        </div>
      </div>
      `,
  styles: [
    `
      .booking-list {
        display: flex;
      }
      @media (max-width: 900px) {
        .booking-list {
          flex-direction: column;
        }
      }
      .booking-list > .li {
        flex: 1;
      }
    `
  ]
})
export class BookingComponent implements OnInit, OnDestroy {
  navClub: IClub;
  isLoggedIn: boolean;
  user: IUser;
  bookingList: IBooking[];
  subUser: Subscription;
  @Select(AppState.currentUser) currentUser$: Observable<IUser>;
  constructor(
    private util: UtilService,
    private metaService: MetaService,
    private clubService: ClubService,
    private accountService: AccountService,
    private bookingService: BookingService
  ) { }

  ngOnInit() {
    const clubId = this.metaService.getUrlClubId();

    // this.metaService.getLoggedInUser
    //   .pipe(
    //     tap(u => {
    //       this.user = u;
    //     }),
    //     switchMap(u => {
    //       return this.clubService.getClubById(clubId);
    //     })
    //   )
    //   .subscribe(club => {
    //     this.navClub = club;
    //     this.getBookingInfo();
    //   });

    this.subUser = this.currentUser$
      .pipe(
        tap(u => {
          this.user = u;
        }),
        switchMap(u => {
          return this.clubService.getClubById(clubId);
        })
      )
      .subscribe(club => {
        this.navClub = club;
        this.getBookingInfo();
      });
  }
  ngOnDestroy(): void {
    if (this.subUser) {
      this.subUser.unsubscribe();
    }
  }
  get clubId() {
    return this.navClub._id;
  }

  private getBookingInfo() {
    if (!this.navClub) {
      return;
    }
    this.addBookings();
    this.getBookingList(this.navClub._id);
  }

  private getBookingList(clubId: string) {
    this.bookingService
      .getBookings(clubId)
      .subscribe((bookings: IBooking[]) => {
        this.bookingList = this.util
          .sort(bookings, 'bookingDate', 'desc')
          .slice(0, 2)
          .reverse();
        for (const booking of this.bookingList) {
          booking.maxPlayers = this.navClub.maxPlayers;
        }
      });
  }

  private addBookings() {
    const comingTwoBookings = this.getComingTwoDays();
    for (const booking of comingTwoBookings) {
      this.bookingService
        .getBookingsByDateName(this.clubId, booking.dateName)
        .subscribe(r => {
          if (!r || r.length === 0) {
            // add booking only if not existing
            this.bookingService
              .addBooking(this.navClub._id, booking)
              .then(newBooking =>
                this.addAllMemberBooking(this.navClub._id, newBooking.id)
              );
          }
        });
    }
  }

  // automatically add members to the newly create booking
  private addAllMemberBooking(clubId: string, bookingId: string): any {
    this.accountService.getClubUsers(clubId).subscribe((users: IUser[]) => {
      for (const user of users) {
        if (user.isMember) {
          this.bookingService.addBookingUser(clubId, bookingId, user);
        }
      }
    });
  }

  private getComingTwoDays() {
    const openDays = this.navClub.openDays.split('');
    const today = new Date().getDay(); // 0-6
    // let days = Date[];
    const bb = openDays
      .map(d => {
        const day = +d;
        return day < today
          ? this.addDay(day + 7 - today)
          : this.addDay(day - today);
      })
      .sort((a, b) => {
        return a > b ? 1 : a < b ? -1 : 0;
      });
    // take only most recent 2 days
    const comingTwoBookings = bb.slice(0, 2).map(d => {
      const newBooking: IBooking = {
        dateName: d.toDateString(),
        bookingDate: d,
        isActive: true,
        clubId: this.navClub._id,
        maxPlayers: this.navClub.maxPlayers
      };
      return newBooking;
    });
    return comingTwoBookings;
  }

  private addDay(days: number) {
    const someDate = new Date();
    someDate.setDate(someDate.getDate() + days);
    return someDate;
  }
}
