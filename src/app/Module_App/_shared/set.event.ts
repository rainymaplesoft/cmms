/*
export class EventConfig {
  setEvents() {
    const event$ = this.router.events.pipe(
      filter(e => {
        if (e instanceof NavigationStart) {
          console.log('navigate caught!');
        }
        return e instanceof NavigationStart;
      })
    );
    const navClub$ = event$.pipe(
      switchMap(event => {
        const navClubId = this.getUrlClubId(event['url']);
        if (!navClubId) {
          return of(null);
        }
        return this.getClubById(navClubId);
      })
    );
    const user$ = navClub$.pipe(
      switchMap(e => {
        this._navClub = e;
        return this.authService.getCurrentUser();
      }),
      delay(200)
    );
    user$.subscribe(u => {
      this._loggedInUser = u;
      const metaInfo: IMetaInfo = {
        navClub: this._navClub,
        loggedinUser: this._loggedInUser
      };
      this.eventService.pub<IMetaInfo>(
        EventName.Event_MetaInfoChanged,
        metaInfo
      );
    });

    this.eventService.on(EventName.Event_SignOut).subscribe(e =>
      this.loggedInUser.subscribe((u: IUser) => {
        this._loggedInUser = u;
        const metaInfo: IMetaInfo = {
          navClub: this._navClub,
          loggedinUser: this._loggedInUser
        };
        this.eventService.pub<IMetaInfo>(
          EventName.Event_MetaInfoChanged,
          metaInfo
        );
      })
    );
  }
}
*/
