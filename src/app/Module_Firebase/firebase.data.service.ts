import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IKeyValue } from '../Module_Core/enums';
import { AngularFireDatabase } from '@angular/fire/database';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { IClub } from './models';
import { map, catchError } from 'rxjs/operators';
// import { AngularFirestore } from '@angular/fire/firestore';
export interface ClubwithId extends IClub {
  clubId: string;
}
@Injectable()
export class FirebaseDataService {
  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {}

  // private clubs: Observable<any[]>;

  // T must contain property "_id:string"
  getCollection<T>(collection: string) {
    const col = this.db
      .collection<T>(collection)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as T;
            data['_id'] = a.payload.doc.id;
            return data;
          })
        ),
        catchError(this.handleErrors)
      );
    return col;
  }

  getDocument<T>(docPath: string) {
    const doc = this.db.doc<T>(docPath);
    return doc;
  }

  private handleErrors(error: any, caught: Observable<any>) {
    console.error('=== Failed to request HTTP service with URL below === ');
    const errorMessage = JSON.stringify(error);
    console.log(error);
    return Observable.throw(error);
  }
}
