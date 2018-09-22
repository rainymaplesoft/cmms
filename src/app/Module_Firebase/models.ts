export interface IUser {
  uid: string;
  email: string;
  role: IRole;
  gender?: number;
  password?: string;
  passwordConfirm?: string;
  cellPhone?: string;
  firstName?: string;
  lastName?: string;
}

export interface IRole {
  subscriber: boolean;
  editor?: boolean;
  admin?: boolean;
}
