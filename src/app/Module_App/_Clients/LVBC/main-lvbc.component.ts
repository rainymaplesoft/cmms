import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'main-lvbc',
  templateUrl: 'main-lvbc.component.html',
  styleUrls: ['../client.component.scss']
})
export class MainLVBCComponent implements OnInit {
  banner = `assets/img/club/club_banner_LVBC.jpg`;
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
