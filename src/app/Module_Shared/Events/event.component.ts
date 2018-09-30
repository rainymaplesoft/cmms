import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { Observable } from 'rxjs';
import {
  CollectionPath,
  FirebaseDataService,
  IClub
} from 'src/app/Module_Firebase';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'event',
  templateUrl: 'event.component.html',
  styleUrls: ['event.component.scss']
})
export class EventComponent implements OnInit {
  indicator_state;
  clubs: Observable<any[]>;
  constructor(private dbService: FirebaseDataService) {}

  ngOnInit() {
    this.getAllClubs();
  }

  getAllClubs() {
    this.clubs = this.dbService.getCollection<IClub>(CollectionPath.CLUBS);
  }

  onClick(club: any) {
    const aa = club;
  }
}
