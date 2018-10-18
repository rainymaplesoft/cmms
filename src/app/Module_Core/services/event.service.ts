import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class EventService {
  private subjects: Subject<any>[] = [];
  private behaviorSubjects: BehaviorSubject<any>[] = [];

  //#region Subject
  pub<T>(eventName: string, data?: T | null) {
    // ensure a subject for the event name exists
    this.subjects[eventName] = this.subjects[eventName] || new Subject<T>();

    // publish event
    if (data) {
      this.subjects[eventName].next(data);
    } else {
      this.subjects[eventName].next();
    }
  }

  on<T>(eventName: string): Observable<T> {
    // ensure a subject for the event name exists
    this.subjects[eventName] = this.subjects[eventName] || new Subject<T>();

    // return observable
    return this.subjects[eventName].asObservable();
  }
  //#endregion

  //#region BehaviorSubject
  pubWithInit<T>(eventName: string, data?: T | null) {
    // ensure a subject for the event name exists
    this.behaviorSubjects[eventName] =
      this.behaviorSubjects[eventName] || new BehaviorSubject<T>(null);

    // publish event
    if (data) {
      this.subjects[eventName].next(data);
    } else {
      this.subjects[eventName].next();
    }
  }

  onWithInit<T>(eventName: string): Observable<T> {
    // ensure a subject for the event name exists
    this.behaviorSubjects[eventName] =
      this.behaviorSubjects[eventName] || new BehaviorSubject<T>(null);

    // return observable
    return this.behaviorSubjects[eventName].asObservable();
  }
  //#endregion
}
