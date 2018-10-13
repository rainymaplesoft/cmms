import { map, take, debounceTime, switchMap, tap, every } from 'rxjs/operators';
import { AbstractControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { CollectionPath, IClub, IUser } from '../../Module_Firebase';
import { FirebaseDataService } from '../../Module_Firebase/firebase.data.service';
import { pipe, of, Subscriber, Observable, forkJoin, from } from 'rxjs';

export class CustomValidator {
  static clubCode(afs: AngularFirestore, clubId: string) {
    return (control: AbstractControl) => {
      const clubCode = control.value;

      const result = afs
        .collection(CollectionPath.CLUBS, ref =>
          ref.where('clubCode', '==', clubCode)
        )
        .snapshotChanges()
        .pipe(
          debounceTime(500),
          take(1),
          map(arr => {
            /* truthy: invalid; falsy: valid */
            if (arr.length && clubId !== arr[0].payload.doc.id) {
              return { invalid: true };
            } else {
              return null;
            }
          })
        );
      return result;
    };
  }
  static ExistingEmail(db: FirebaseDataService) {
    return (control: AbstractControl) => {
      const email = control.value;
      const result = db
        .getCollection(CollectionPath.USERS, ['email', '==', email])
        .pipe(
          debounceTime(500),
          take(1),
          map(arr => {
            /* truthy: invalid; falsy: valid */
            if (arr && arr.length > 0) {
              return { invalid: true };
            } else {
              return null;
            }
          })
        );
      return result;
    };
  }
}
