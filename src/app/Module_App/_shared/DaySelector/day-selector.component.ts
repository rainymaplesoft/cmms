import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'day-selector',
  templateUrl: 'day-selector.component.html',
  styles: [
    `
      .day-checkbox {
        display: flex;
        flex-wrap: wrap;
      }
      .day-checkbox .day {
        margin-right: 8px;
      }
    `
  ]
})
export class DaySelectorComponent implements OnInit, OnChanges {
  @Input()
  days: string;
  @Output()
  dayChanged = new EventEmitter<boolean>();

  selections = [false, false, false, false, false, false, false];
  dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    for (let i = 0; i < this.selections.length; i++) {
      this.selections[i] = this.includeDay(i);
    }
  }

  private includeDay(i: number) {
    return this.days.indexOf(i.toString()) >= 0;
  }

  onChange() {
    this.dayChanged.emit(true);
  }

  get selectedDays() {
    let result = '';
    for (let i = 0; i < this.selections.length; i++) {
      result = result + (this.selections[i] ? i.toString() : '');
    }
    return result;
  }
}
