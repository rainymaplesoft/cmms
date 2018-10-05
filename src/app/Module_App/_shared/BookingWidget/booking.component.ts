import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/Module_Core';
import { MetaService } from 'src/app/Module_App/meta.service';
import { IMetaInfo, IUser } from 'src/app/Module_Firebase';
import { EventName } from '../../config';
import RouteName from 'src/app/routename';
import { IClub, IBooking } from '../../../Module_Firebase/models';
import { BookingService } from '../booking.service';
import { tap, take } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-booking',
  template: `
      <div class="booking-list" *ngIf='bookingList'>
        <div class="li"  *ngFor='let booking of bookingList; index as i;'>
          <booing-widget [booking]='booking'></booing-widget>
        </div>
      </div>
      `,
  styles: [
    `
      .booking-list {
        display: flex;
        @media (max-width: 767.8px) {
          flex-direction: column;
        }
      }
      .booking-list > .li {
        flex: 1;
      }
    `
  ]
})
export class BookingComponent implements OnInit {
  navClub: IClub;
  isLoggedIn: boolean;
  user: IUser;
  bookings: IBooking[];
  bookingList: IBooking[];
  constructor(
    private eventService: EventService,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.eventService
      .on<IMetaInfo>(EventName.Event_MetaInfoChanged)
      .pipe(take(1))
      .subscribe((metaInfo: IMetaInfo) => {
        this.isLoggedIn = !!metaInfo.loggedinUser;
        this.navClub = metaInfo.navClub;
        this.user = metaInfo.loggedinUser;
        this.getBookingInfo();
        this.addBookings();
      });
  }

  get clubId() {
    return this.navClub._id;
  }

  getBookingList(clubId: string) {
    this.bookingService
      .getBookings(clubId)
      .subscribe((bookings: IBooking[]) => {
        this.bookingList = bookings
          .sort((a, b) => {
            return a.bookingDate > b.bookingDate
              ? 1
              : a.bookingDate < b.bookingDate
                ? -1
                : 0;
          })
          .slice(0, 2);
      });
  }

  private getBookingInfo() {
    if (!this.navClub) {
      return;
    }
    this.getBookingList(this.navClub._id);

    const openDays = this.navClub.openDays.split('');
    const today = new Date();
    const weekDay = today.getDay(); // 0-6
    // let days = Date[];
    const bb = openDays
      .map(d => {
        const day = +d;
        return day < weekDay
          ? this.addDay(day + 7 - weekDay)
          : this.addDay(day - weekDay);
      })
      .sort((a, b) => {
        return a > b ? 1 : a < b ? -1 : 0;
      });
    this.bookings = bb.slice(0, 2).map(d => {
      return { dateName: d.toDateString(), bookingDate: d, isActive: true };
    });
  }

  private addDay(days: number) {
    const someDate = new Date();
    someDate.setDate(someDate.getDate() + days);
    return someDate;
  }

  private addBookings() {
    for (const booking of this.bookings) {
      this.bookingService
        .getBookingsByName(this.clubId, booking.dateName)
        .subscribe(r => {
          if (!r || r.length === 0) {
            this.bookingService.addBooking(this.navClub._id, booking);
          }
        });
    }
  }
}
