import { Component, OnInit, Input } from '@angular/core';
import { IBooking } from '../../../Module_Firebase';
import { DateConst } from '../../config';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'booing-widget',
  templateUrl: 'booking-widget.component.html',
  styleUrls: ['booking-widget.component.scss']
})
export class BookingWidgetComponent implements OnInit {
  @Input()
  booking: IBooking;

  monthes = DateConst.monthes;
  weekdays = DateConst.weekdays;

  year: string;
  month: string;
  day: string;
  weekday: string;
  monthYear: string;

  constructor() {}

  ngOnInit() {
    const date = new Date(this.booking.dateName);
    this.day = date.getDate().toString();
    this.weekday = this.weekdays[date.getDay()];
    this.month = this.monthes[date.getMonth()];
    this.year = date.getFullYear().toString();
    this.monthYear = `${this.month} ${this.year}`;
  }
}
