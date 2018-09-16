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
  <div [@.disabled]="activated > 2">
    <div [@slide] *ngIf='invalid' class="val_error" style=' opacity: 1 '><ng-content></ng-content></div>
  </div>
  `, // <div *ngIf='invalid && activated > 2' class="val_error"><ng-content></ng-content></div>
  styles: ['.val_error{color: darkred;min-height:30px;}'],
  animations: [
    trigger('slide', [
      state('show', style({ height: '*' })),
      transition('void=>*', [
        style({ transform: 'translateY(-30px)', opacity: 0 }),
        animate(300)
      ])
    ])
  ]
})
export class ValMsgComponent implements OnInit, OnChanges {
  @Input()
  invalid: boolean;

  lastInvalid = false;
  activated = 0;

  constructor() {}

  ngOnInit() {}
  ngOnChanges(): void {
    if (this.lastInvalid !== this.invalid) {
      this.lastInvalid = this.invalid;
      this.activated++;
    }
  }
}
