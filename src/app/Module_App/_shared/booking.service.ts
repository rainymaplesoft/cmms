import { Injectable } from '@angular/core';
import {
  FirebaseDataService,
  IBooking,
  CollectionPath,
  IUser
} from '../../Module_Firebase';
import { DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable()
export class BookingService {
  constructor(private dbService: FirebaseDataService) {}

  addBooking(clubId: string, data: IBooking) {
    const path = this.bookingPath(clubId);
    const newBooking$ = this.dbService.addDocument(path, data);
    return newBooking$;
    // newBooking$.then((booking: DocumentReference) => {
    //   this.getBookingById(clubId, booking.id);
    // });
  }

  updateBooking(clubId: string, data: IBooking) {
    const path = this.bookingPath(clubId, data._id);
    this.dbService.updateDocument<IBooking>(path, data).then((r: boolean) => {
      const result = r;
      // this.getBookingById()
    });
  }

  deleteBooking(clubId: string, bookingId: string) {
    const path = this.bookingPath(clubId, bookingId);
    // const path = `${CollectionPath.CLUBS}/${clubId}/${
    //   CollectionPath.BOOKINGS
    // }/${bookingId}`;
    return this.dbService.delete(path);
  }

  getBookingUsers(clubId: string, bookingId: string): Observable<IUser[]> {
    const path = this.bookingPath(clubId, bookingId, 'all');
    const bookingUsers$ = this.dbService.getCollection<IUser>(path);
    return bookingUsers$;
  }

  addBookingUser(clubId: string, bookingId: string, data: IUser) {
    const path = this.bookingPath(clubId, bookingId, 'all');
    this.dbService.addDocumentWithId(path, data._id, data);
  }

  getBookingById(clubId: string, bookingId: string) {
    const path = this.bookingPath(clubId, bookingId);
    return this.dbService.getSimpleDocument<IBooking>(path).valueChanges();
  }

  getBookingsByDateName(clubId: string, dateName: string) {
    const path = this.bookingPath(clubId);
    const bookings$ = this.dbService.getCollection<IBooking>(path, [
      'dateName',
      '==',
      dateName
    ]);
    return bookings$;
  }

  checkUserBooked(clubId: string, bookingId: string, userId: string) {
    const path = this.bookingPath(clubId, bookingId, userId);
    return this.dbService.getSimpleDocument<IUser>(path).valueChanges();
  }

  cancelBooking(clubId: string, bookingId: string, userId: string) {
    const path = this.bookingPath(clubId, bookingId, userId);
    return this.dbService.delete(path);
  }

  getBookings(clubId: string) {
    const path = `${CollectionPath.CLUBS}/${clubId}/${CollectionPath.BOOKINGS}`;
    const bookings$ = this.dbService.getCollection<IBooking>(path);
    return bookings$;
  }

  private bookingPath(clubId: string, bookingId?: string, userId?: string) {
    let path = `${CollectionPath.CLUBS}/${clubId}/${CollectionPath.BOOKINGS}`;
    if (bookingId) {
      path = `${path}/${bookingId}`;
    }
    if (userId && userId === 'all') {
      path = `${path}/${CollectionPath.USERS}`;
    }
    if (userId && userId !== 'all') {
      path = `${path}/${CollectionPath.USERS}/${userId}`;
    }
    return path;
  }
}
