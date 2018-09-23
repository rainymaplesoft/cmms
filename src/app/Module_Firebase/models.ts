export enum CollectionPath {
  CLUBS = 'clubs',
  USERS = 'users'
}

export interface IUser {
  _id?: string;
  uid: string;
  email: string;
  role: IRole;
  gender?: number;
  password?: string;
  passwordConfirm?: string;
  cellPhone?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  loggedInClub?: IClub;
}

export interface IRole {
  subscriber: boolean;
  editor?: boolean;
  admin?: boolean;
  superUser?: boolean;
}

export interface IClub {
  _id?: string; // _id is document id of firebase document
  id: number;
  clubName: string;
  clubCode: string;
  contactName: string;
  address?: string;
  email?: string;
  phone1?: string;
  phone2?: string;
  isActive?: boolean;
}
