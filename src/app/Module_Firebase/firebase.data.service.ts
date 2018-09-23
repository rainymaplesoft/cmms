import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IKeyValue } from '../Module_Core/enums';
import { AngularFireDatabase } from '@angular/fire/database';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  Action,
  DocumentSnapshotDoesNotExist,
  DocumentSnapshotExists
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { IClub } from './models';
import { map, catchError, take } from 'rxjs/operators';
// import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from '../Module_Core/services/toastr.service';
import * as firebase from 'firebase';
export interface ClubwithId extends IClub {
  clubId: string;
}
@Injectable()
export class FirebaseDataService {
  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService
  ) {}

  // private clubs: Observable<any[]>;

  // T must contain property "_id:string"
  getCollection<T>(
    collectionPath: string,
    whereExp?: string[],
    orderByExp?: string[]
  ) {
    const collectionQuery = this.db.collection<T>(collectionPath, ref => {
      let query:
        | firebase.firestore.CollectionReference
        | firebase.firestore.Query = ref;
      if (orderByExp && orderByExp.length === 2) {
        query = query.orderBy(
          orderByExp[0],
          orderByExp[1] === 'desc' ? 'desc' : 'asc'
        );
      }
      if (whereExp && whereExp.length === 3) {
        switch (whereExp[1]) {
          case '==':
            query = query.where(whereExp[0], '==', whereExp[2]);
            break;
          case '=>':
            query = query.where(whereExp[0], '>=', whereExp[2]);
            break;
          case '<=':
            query = query.where(whereExp[0], '<=', whereExp[2]);
            break;
          case '>':
            query = query.where(whereExp[0], '>', whereExp[2]);
            break;
          case '<':
            query = query.where(whereExp[0], '<', whereExp[2]);
            break;
        }
      }
      return query;
    });
    const col = collectionQuery.snapshotChanges().pipe(
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

  addDocument<T>(
    ref: string,
    data
  ): Promise<firebase.firestore.DocumentReference> {
    const timestamp = this.timestamp;
    return this.db.collection(ref).add({
      ...data,
      updatedAt: timestamp,
      createdAt: timestamp
    });
  }

  updateDocument<T>(docPath: string, data: T): Promise<boolean> {
    const doc = this.db.doc<T>(docPath);
    return doc
      .update(data)
      .then(i => this.actionSucceeded(), i => this.actionFailed());
  }

  /* https://angularfirebase.com/lessons/firestore-advanced-usage-angularfire/
  Usage
    this.db.upsert('notes/xyz', { content: 'hello dude' })
  */

  upsert<T>(ref: string, data: any): Promise<boolean> {
    const doc = this.db
      .doc(ref)
      .snapshotChanges()
      .pipe(take(1))
      .toPromise();

    return doc.then(
      (
        snap: Action<DocumentSnapshotDoesNotExist | DocumentSnapshotExists<T>>
      ) => {
        return snap.payload.exists
          ? this.update(ref, data)
          : this.set(ref, data);
      }
    );
  }

  delete<T>(ref: string): Promise<boolean> {
    return this.db
      .doc(ref)
      .delete()
      .then(i => this.actionSucceeded(), i => this.actionFailed());
  }

  /// Firebase Server Timestamp
  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  //#region low level firebase functions

  private set<T>(ref: string, data: any): Promise<boolean> {
    const timestamp = this.timestamp;
    return this.db
      .doc(ref)
      .set({ ...data, updatedAt: timestamp, createdAt: timestamp })
      .then(i => this.actionSucceeded(), i => this.actionFailed());
  }

  private update<T>(ref: string, data: any): Promise<boolean> {
    return this.db
      .doc(ref)
      .update({ ...data, updatedAt: this.timestamp })
      .then(i => this.actionSucceeded(), i => this.actionFailed());
  }

  //#endregion

  private actionSucceeded() {
    this.toastr.success('Data Saved successfully');
    return true;
  }

  private actionFailed() {
    this.toastr.error('Failed to Saved data');
    return false;
  }

  private handleErrors(error: any, caught: Observable<any>) {
    console.error('=== Failed to request HTTP service with URL below === ');
    const errorMessage = JSON.stringify(error);
    console.log(error);
    return Observable.throw(error);
  }
}
