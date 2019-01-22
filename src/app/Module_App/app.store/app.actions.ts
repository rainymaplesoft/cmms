import { IUser } from '../../Module_Firebase/models';
export class SetLoginStateAction {
  static readonly type = '[Auth] SetLoginStateAction';
  constructor(
    public userId: string,
    public clubId: string,
    public user: IUser
  ) { }
}
export class SetCurrentUserAction {
  static readonly type = '[Auth] SetCurrentUserAction';
  constructor(public user: IUser) { }
}
export class UpdateCurrentUserAction {
  static readonly type = '[Auth] UpdateCurrentUserAction';
  constructor(public user: IUser) { }
}
