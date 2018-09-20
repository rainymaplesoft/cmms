import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'landing',
  templateUrl: 'landing.component.html',
  styleUrls: ['landing.component.scss']
})
export class LandingComponent implements OnInit {
  title = 'Welcome to the home page';
  color = '#3774b2';

  images = [1, 2, 3].map(i => `assets/img/car_${i}.jpg`);
  constructor() {}

  ngOnInit() {}
}
