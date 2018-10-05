import { Injectable } from '@angular/core';
import {
  FirebaseDataService,
  IBooking,
  CollectionPath
} from '../../Module_Firebase';
import { DocumentReference } from '@angular/fire/firestore';

@Injectable()
export class BookingService {
  constructor(private dbService: FirebaseDataService) {}

  addBooking(clubId: string, data: IBooking) {
    const path = `${CollectionPath.CLUBS}/${clubId}/${CollectionPath.BOOKINGS}`;
    const newBooking$ = this.dbService.addDocument(path, data);
    newBooking$.then((booking: DocumentReference) => {
      this.getBookingById(clubId, booking.id);
    });
  }

  updateBooking(clubId: string, data: IBooking) {
    const path = `${CollectionPath.CLUBS}/${clubId}/${
      CollectionPath.BOOKINGS
    }/${data._id}`;
    this.dbService.updateDocument<IBooking>(path, data).then((r: boolean) => {
      const result = r;
      // this.getBookingById()
    });
  }

  getBookingById(clubId: string, bookingId: string) {
    const path = `${CollectionPath.CLUBS}/${clubId}/${
      CollectionPath.BOOKINGS
    }/${bookingId}`;
    return this.dbService.getSimpleDocument<IBooking>(path).valueChanges();
  }

  getBookingsByName(clubId: string, dateName: string) {
    const path = `${CollectionPath.CLUBS}/${clubId}/${CollectionPath.BOOKINGS}`;
    const bookings$ = this.dbService.getCollection<IBooking>(path, [
      'dateName',
      '==',
      dateName
    ]);
    return bookings$;
  }

  getBookings(clubId: string) {
    const path = `${CollectionPath.CLUBS}/${clubId}/${CollectionPath.BOOKINGS}`;
    const bookings$ = this.dbService.getCollection<IBooking>(path);
    return bookings$;
  }
}
