export enum CollectionPath {
  CLUBS = 'clubs',
  USERS = 'users'
}

export interface IUser {
  _id?: string;
  uid: string;
  email: string;
  role: IRole;
  isMember?: boolean;
  gender?: number; // 1 => male
  password?: string;
  passwordConfirm?: string;
  cellPhone?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  loggedInClubId?: string;
}

export interface IRole {
  subscriber: boolean;
  editor?: boolean;
  admin?: boolean;
  superUser?: boolean;
}

export interface IClub {
  _id?: string; // _id is document id of firebase document
  clubName: string;
  clubCode: string;
  contactName?: string;
  address?: string;
  email?: string;
  phone1?: string;
  phone2?: string;
  mapLink?: string;
  isActive?: boolean;
}
