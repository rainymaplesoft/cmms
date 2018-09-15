import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'spinner',
  template: `<mat-spinner [diameter]='25' [ngClass]="{'yellow':isYellow}"  *ngIf="isRunning"></mat-spinner>`,
  styleUrls: ['spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() isRunning: boolean;
  @Input() isYellow: boolean;
  constructor() {}

  ngOnInit() {}
}
