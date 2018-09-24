import { map, take, debounceTime } from 'rxjs/operators';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { CollectionPath } from '../../Module_Firebase';

export class ClubValidator {
  static clubCode(afs: AngularFirestore, clubId: string) {
    return (control: AbstractControl) => {
      const clubCode = control.value;

      return afs
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
              return { clubCodevailable: true };
            } else {
              return null;
            }
          })
        );
    };
  }
}
