import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'main-lpbc',
  templateUrl: 'main-lpbc.component.html',
  styleUrls: ['../client.component.scss']
})
export class MainLPBCComponent implements OnInit {
  banner = `assets/img/club/club_banner_LPBC.jpg`;
  path = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.path = this.router.url;
  }

  onLogin() {
    const signPath = `${this.path}/sign`;
    this.router.navigate([signPath]);
  }
}
