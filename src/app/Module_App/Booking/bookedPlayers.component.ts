import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IUser, IBooking } from '../../Module_Firebase/models';
import {
  slideUpDownAnimation,
  pullUpDownAnimate
} from '../../Module_Core/animation/animation.common';

@Component({
  selector: 'booked-players',
  templateUrl: 'bookedPlayers.component.html',
  styles: [
    `
      .player-chip {
        padding: 15px 10px 10px 10px;
      }
      .member {
        background-color: skyblue;
      }
      .chip-list {
        display: flex;
        flex-wrap: wrap;
      }
    `
  ],
  animations: [pullUpDownAnimate]
})
export class BookedPlaysComponent implements OnInit, OnChanges {
  @Input()
  bookedPlayers: IUser[];
  @Input()
  bookingId: string;
  @Input()
  selectedBookingId: string;
  players: IUser[];

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.bookingId === this.selectedBookingId && this.bookedPlayers) {
      this.players = this.bookedPlayers.sort(
        (a, b) => (a.lastName > b.lastName ? 1 : -1)
      );
    }
  }
}
