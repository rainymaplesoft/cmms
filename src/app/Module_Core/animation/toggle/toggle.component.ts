import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'toggle-arrow',
  template: `
    <span *ngIf='!hide' class='toggle_icon' [ngStyle]="{color:iconColor}" (click)='clicked()'>
      <i [@toggle]='state' class="material-icons" *ngIf='defaultUp'>expand_less</i>
      <i [@toggle]='state' class="material-icons" *ngIf='!defaultUp'>expand_more</i>
    </span>
    `,
  styles: [`
     .toggle_icon{
          cursor: pointer;
          color:black;
      }
  `],
  animations: [
    trigger('toggle', [
      state('normal', style({ 'transform': 'rotate(0)' })),
      state('reverse', style({ 'transform': 'rotate(180deg)' })),
      transition('normal<=>reverse', [style({}), animate('300ms ease-out')])
    ])
  ]
})
export class ToggleComponent implements OnInit {

  @Input() hide = false;
  @Input() defaultUp = true;
  @Input() iconColor = 'black';
  @Output() toggle = new EventEmitter<boolean>();

  isDefault: boolean;
  state = 'normal';
  constructor() { }

  ngOnInit() {
    this.isDefault = true;
  }
  clicked() {
    this.isDefault = !this.isDefault;
    this.state = this.state === 'normal' ? 'reverse' : 'normal';
    this.toggle.emit(this.isDefault);
  }
}
