import { IUser } from '../../Module_Firebase/models';
export class SetLoginState {
  static readonly type = '[Auth] SetLoginState';
  constructor(
    public userId: string,
    public clubId: string,
    public user: IUser
  ) {}
}
export class SetCurrentUserAction {
  static readonly type = '[Auth] SetCurrentUserAction';
  constructor(public user: IUser) {}
}
