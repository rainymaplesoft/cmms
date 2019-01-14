import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'main-cdbc',
  templateUrl: 'main-cdbc.component.html',
  styleUrls: ['../client.component.scss']
})
export class MainCDBCComponent implements OnInit {
  banner = `assets/img/club/club_banner_TCBC.jpg`;

  constructor() {}

  ngOnInit() {}
}
