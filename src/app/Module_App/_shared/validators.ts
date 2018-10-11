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
      const pathClubs = `${CollectionPath.CLUBS}`;
      const result = db.getCollection<IClub[]>(pathClubs).pipe(
        debounceTime(1000),
        take(1),
        switchMap((clubs: IClub[]) => {
          const users$: Observable<IUser[]>[] = [];
          // for (const club of clubs) {
          //   const clubId = club._id;
          //   const pathClubUsers = `${CollectionPath.CLUBS}/${clubId}/${
          //     CollectionPath.USERS
          //   }`;
          const pathClubUsers = 'clubs/D82si39pqPY6EqEix8yy/users';
          const user$ = db.getCollection<IUser>(pathClubUsers, [
            'email',
            '==',
            email
          ]);
          //   users$.push(user$);
          // }
          // users$.push(user$);
          users$.push(user$);
          // return from(user$).pipe(
          return user$.pipe(
            // switchMap(u => u),
            switchMap(results => {
              const invalid = !!results ? { emailExists: true } : null;

              console.log(control);
              return of(invalid);
            })
          );
        })
        // map(results => {
        //   const invalid = results.some(c => c && c.length > 0)
        //     ? { invalid: true }
        //     : null;
        //   return invalid;
        // })
      );
      return result;
    };
  }
}
