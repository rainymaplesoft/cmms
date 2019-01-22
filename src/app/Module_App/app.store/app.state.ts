import { State, Select, Action, StateContext, Selector } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetLoginStateAction, SetCurrentUserAction, UpdateCurrentUserAction } from './app.actions';
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
  constructor() { }

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
    if (!state.currentUser) {
      return false;
    }
    return state.currentUser.isAdmin;
  }
  @Selector()
  static isSuperAdmin(state: AppStateModel) {
    if (!state.currentUser) {
      return false;
    }
    return state.currentUser.isSuperAdmin;
  }
  @Selector()
  static isAdminOrSuperAdmin(state: AppStateModel) {
    if (!state.currentUser) {
      return false;
    }
    return state.currentUser.isSuperAdmin || state.currentUser.isAdmin;
  }
  @Selector()
  static currentUser(state: AppStateModel) {
    return state.currentUser;
  }
  @Selector()
  static isLoggedIn(state: AppStateModel) {
    return !!state.currentUser;
  }

  @Action(SetLoginStateAction)
  setLoginState(ctx: StateContext<AppStateModel>, payload: SetLoginStateAction) {
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

  @Action(UpdateCurrentUserAction)
  updateCurrentUserAction(
    ctx: StateContext<AppStateModel>,
    payload: UpdateCurrentUserAction
  ) {
    const currentUser = ctx.getState().currentUser;
    const user = payload.user;
    ctx.patchState({
      currentUser: {
        ...currentUser,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        cellPhone: user.cellPhone,
        gender: user.gender
      }
    });
  }
}
