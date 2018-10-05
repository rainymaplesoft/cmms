export interface IMetaInfo {
  navClub: IClub;
  loggedinUser: IUser;
  // loggedInClub: IClub;
}

export enum CollectionPath {
  CLUBS = 'clubs',
  USERS = 'users',
  BOOKINGS = 'bookings'
}

export enum StorageItem {
  CLUB_ID = '__STORAGE_CLUB_ID__',
  USER_ID = '__STORAGE_USER_ID__'
}

export interface IUser {
  _id?: string;
  uid: string;
  email: string;
  role: IRole;
  isMember?: boolean;
  isAdmin?: boolean;
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
  maxAmount?: number;
  contactName?: string;
  address?: string;
  email?: string;
  phone1?: string;
  phone2?: string;
  mapLink?: string;
  isActive?: boolean;
  openDays?: string;
}

export interface IOpenDay {
  day: number; // Sunday=>0 ...
  isActive?: boolean;
}

export interface IBooking {
  _id?: string;
  dateName: string;
  bookingDate: Date;
  isActive?: boolean;
  users?: IUser[];
}
