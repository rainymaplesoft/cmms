import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'club-select',
  templateUrl: 'club-select.component.html',
  styleUrls: ['club-select.component.scss']
})
export class ClubSelectComponent implements OnInit {
  images = ['LPBC', 'LVBC', 'WIBC', 'TABC', 'TBBC', 'TDBC'].map(
    i => `assets/img/club/club_entry_${i}.jpg`
  );
  imgUrl = 'url(assets/img/club/club_entry_LPBC.jpg)';
  constructor() {}

  ngOnInit() {}
}
