import { Component, OnInit, Input } from '@angular/core';
import { IBooking } from '../../../Module_Firebase';
import { DateConst } from '../../config';
import { fadeInAnimation } from '../../../Module_Core/animation/animation.common';
import { BookingService } from '../booking.service';
import { MatDialog } from '@angular/material';
import { DialogYesNoComponent } from '../../../Module_Core/components/dialog/dialog-yes-no';
import { DialogConfirm } from '../../../Module_Core/enums';
import { IUser } from '../../../Module_Firebase/models';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'booing-widget',
  templateUrl: 'booking-widget.component.html',
  styleUrls: ['booking-widget.component.scss'],
  animations: [fadeInAnimation]
})
export class BookingWidgetComponent implements OnInit {
  @Input()
  booking: IBooking;
  @Input()
  loggedinUser: IUser;

  monthes = DateConst.monthes;
  weekdays = DateConst.weekdays;

  year: string;
  month: string;
  day: string;
  weekday: string;
  monthYear: string;
  isBooked: boolean;
  available: number;

  get labelAvailable() {
    return this.available ? `Available: ${this.available}` : 'Fully booked';
  }

  constructor(
    private bookingService: BookingService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initDateInfo();
    this.setBookingStatus();
  }

  initDateInfo(): any {
    const date = new Date(this.booking.dateName);
    this.day = date.getDate().toString();
    this.weekday = this.weekdays[date.getDay()];
    this.month = this.monthes[date.getMonth()];
    this.year = date.getFullYear().toString();
    this.monthYear = `${this.month} ${this.year}`;
  }

  setBookingStatus() {
    this.bookingService
      .getBookingUsers(this.booking.clubId, this.booking._id)
      .subscribe((c: IUser[]) => {
        const usersBooked = c;
        const bookedAmount =
          (usersBooked && usersBooked.length) > 0 ? usersBooked.length : 0;
        this.available = this.booking.maxPlayers - bookedAmount;
        if (this.loggedinUser) {
          this.bookingService
            .checkUserBooked(
              this.booking.clubId,
              this.booking._id,
              this.loggedinUser._id
            )
            .subscribe(u => {
              this.isBooked = !!u;
            });
        }
      });
  }

  onBook() {
    console.log(this.booking);
    this.bookingService.addBookingUser(
      this.booking.clubId,
      this.booking._id,
      this.loggedinUser
    );
  }

  onCancel(callback: any) {
    console.log(this.booking._id);
    const msg = 'Do you really want to cancel this booking?';
    const dialogRef = this.dialog.open(DialogYesNoComponent, {
      data: { message: msg }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === DialogConfirm.Yes) {
        // this.bookingService
        //   .deleteBooking(this.booking.clubId, this.booking._id)
        //   .then(
        //     _ => console.log('deleted successfully'),
        //     _ => console.log('failed to delete')
        //   );
        this.bookingService
          .cancelBooking(
            this.booking.clubId,
            this.booking._id,
            this.loggedinUser._id
          )
          .then(
            _ => console.log('cancel successfully'),
            _ => console.log('failed to cancel')
          );
      }
    });
  }
}
