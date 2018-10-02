import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'main-wibc',
  templateUrl: 'main-wibc.component.html',
  styleUrls: ['../client.component.scss']
})
export class MainWIBCComponent implements OnInit {
  banner = `assets/img/club/club_banner_WIBC.jpg`;

  constructor() {}

  ngOnInit() {}
}
