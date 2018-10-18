import { Injectable } from '@angular/core';
import { FireAuthService, IClub, IUser, StorageItem } from '../Module_Firebase';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from '../Module_Core/services/storage.service';
import { UtilService } from '../Module_Core';
import { RouteName } from '../routename';
import { EventService } from '../Module_Core/services/event.service';
import { EventName } from './config';
import { take } from 'rxjs/operators';

@Injectable()
export class MetaService {
  _loggedInUser: IUser;
  navClubCode: string;
  _navClub: IClub;
  authState: Observable<firebase.User>;

  constructor(
    private router: Router,
    private utilService: UtilService,
    private eventService: EventService,
    private authService: FireAuthService,
    private storageService: StorageService
  ) {}

  get loggedInclubId() {
    return this.storageService.getItem(StorageItem.CLUB_ID);
  }

  get loggedInUserId() {
    return this.storageService.getItem(StorageItem.USER_ID);
  }

  get getLoggedInUser() {
    return this.authService.getCurrentUser().pipe(take(1));
  }

  signOut() {
    return this.authService.signOut().then(c => {
      this.eventService.pub(EventName.Event_SignOut);
      this.router.navigate([RouteName.Home]);
      return 0;
    });
  }

  getUrlClubId(url?: string) {
    return this.utilService.getUrlParam('clubId', url);
  }
}
