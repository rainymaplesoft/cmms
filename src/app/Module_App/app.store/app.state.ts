import { State, Select, Action, StateContext, Selector } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetLoginState, SetCurrentUserAction } from './app.actions';
import { IUser } from 'src/app/Module_Firebase';

export class AppStateModel {
  userId?: string;
  loggedInclubId?: string;
  currentUser?: IUser;
  username?: string;
  loggedInClubName?: string;
  isAdmin?: boolean;
  isSuper?: boolean;
}

@State<AppStateModel>({
  name: 'appState',
  defaults: {}
})
export class AppState {
  constructor() {}

  @Selector()
  static userId(state: AppStateModel) {
    return state.userId;
  }
  @Selector()
  static loggedInClubName(state: AppStateModel) {
    return state.loggedInClubName;
  }
  @Selector()
  static loggedInclubId(state: AppStateModel) {
    return state.loggedInclubId;
  }
  @Selector()
  static isAdmin(state: AppStateModel) {
    return state.currentUser.isAdmin;
  }
  @Selector()
  static isSuperAdmin(state: AppStateModel) {
    return state.currentUser.isSuperAdmin;
  }
  @Selector()
  static currentUser(state: AppStateModel) {
    return state.currentUser;
  }

  @Action(SetLoginState)
  setLoginState(ctx: StateContext<AppStateModel>, payload: SetLoginState) {
    ctx.patchState({
      userId: payload.userId,
      loggedInclubId: payload.clubId,
      currentUser: payload.user,
      username: payload.user
        ? `${payload.user.firstName} ${payload.user.lastName}`
        : '',
      isAdmin: payload.user ? payload.user.isAdmin : false,
      isSuper: payload.user ? payload.user.isSuperAdmin : false
    });
  }

  @Action(SetCurrentUserAction)
  setCurrentUserAction(
    ctx: StateContext<AppStateModel>,
    payload: SetCurrentUserAction
  ) {
    ctx.patchState({ currentUser: payload.user });
  }
}
