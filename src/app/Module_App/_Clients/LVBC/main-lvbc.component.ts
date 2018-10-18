import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientBase } from '../client.base';
import { MetaService } from '../../meta.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'main-lvbc',
  templateUrl: 'main-lvbc.component.html',
  styleUrls: ['../client.component.scss']
})
export class MainLVBCComponent extends ClientBase implements OnInit {
  banner = `assets/img/club/club_banner_LVBC.jpg`;
  constructor(router: Router, metaService: MetaService) {
    super(router, metaService);
  }
}
