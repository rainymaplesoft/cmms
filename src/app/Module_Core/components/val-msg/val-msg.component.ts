import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {
  trigger,
  state,
  animate,
  transition,
  style
} from '@angular/animations';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'val-msg',
  template: `
    <div [@slide] *ngIf='invalid' class="val_error"><ng-content></ng-content></div>
  `,
  styles: ['.val_error{color: darkred;min-height:30px;}'],
  animations: [
    trigger('slide', [
      state('show', style({ height: '*' })),
      transition('void=>*', [
        style({ transform: 'translateY(-30px)' }),
        animate(300)
      ])
    ])
  ]
})
export class ValMsgComponent implements OnInit, OnChanges {
  @Input()
  invalid: string;

  message: string;
  hasError: boolean;

  constructor() {}

  ngOnInit() {}
  ngOnChanges(): void {}
}
