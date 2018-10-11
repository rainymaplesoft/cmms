import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IUser, IBooking } from '../../Module_Firebase/models';
import {
  slideUpDownAnimation,
  pullUpDownAnimate
} from '../../Module_Core/animation/animation.common';
import { DialogYesNoComponent, DialogConfirm } from 'src/app/Module_Core';
import { MatDialog } from '@angular/material';
import { BookingService } from '../_shared';

@Component({
  selector: 'booked-players',
  templateUrl: 'bookedPlayers.component.html',
  styleUrls: ['bookedPlayers.component.scss'],
  animations: [pullUpDownAnimate]
})
export class BookedPlaysComponent implements OnInit, OnChanges {
  @Input()
  bookedPlayers: IUser[];
  @Input()
  bookingId: string;
  @Input()
  date: string;
  @Input()
  clubId: string;
  @Input()
  selectedBookingId: string;
  players: IUser[];
  activePlayer: IUser;

  constructor(
    private bookingService: BookingService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.bookingId === this.selectedBookingId && this.bookedPlayers) {
      this.players = this.bookedPlayers.sort(
        (a, b) => (a.lastName > b.lastName ? 1 : -1)
      );
    }
  }

  onDelete(player: IUser) {
    const msg = `Do you really want to remove ${player.firstName} ${
      player.lastName
    } from ${this.date}?`;
    const dialogRef = this.dialog.open(DialogYesNoComponent, {
      data: { message: msg }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === DialogConfirm.Yes) {
        this.bookingService
          .cancelBooking(this.clubId, this.bookingId, player._id)
          .then(
            _ => console.log('cancel successfully'),
            _ => console.log('failed to cancel')
          );
      }
    });
  }
}
