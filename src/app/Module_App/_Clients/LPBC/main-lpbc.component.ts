import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MetaService } from '../../meta.service';
import { ClientBase } from '../client.base';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'main-lpbc',
  templateUrl: 'main-lpbc.component.html',
  styleUrls: ['../client.component.scss']
})
export class MainLPBCComponent extends ClientBase implements OnInit {
  banner = `assets/img/club/club_banner_LPBC.jpg`;

  constructor(router: Router, metaService: MetaService) {
    super(router, metaService);
  }
}
