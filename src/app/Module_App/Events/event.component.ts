import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'event-latest',
  templateUrl: 'event.component.html',
  styleUrls: ['event.component.scss']
})
export class EventLatestComponent implements OnInit {
  indicator_state;
  eventImage = `url(assets/img/club/pic_lpbc_02.jpg)`;
  constructor() {}

  ngOnInit() {}

  onClick(club: any) {
    const aa = club;
  }
}
