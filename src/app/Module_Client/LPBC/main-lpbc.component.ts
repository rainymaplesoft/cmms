import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'main-lpbc',
  templateUrl: 'main-lpbc.component.html',
  styleUrls: ['../client.component.scss']
})
export class MainLPBCComponent implements OnInit {
  banner = `assets/img/club/club_banner_LPBC.jpg`;
  constructor() {}

  ngOnInit() {}
}
