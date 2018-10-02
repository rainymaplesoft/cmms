import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'view-header',
  templateUrl: 'view-header.component.html',
  styleUrls: ['view-header.component.scss']
})
export class ViewHeaderComponent implements OnInit {
  constructor() {}
  @Input()
  title: string;

  @Input()
  color = '#3774b2';

  ngOnInit() {}
}
