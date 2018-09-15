
export interface IKeyValue {
  key: string;
  value: string;
}

export interface ISelection {
  id: any;
  name: string;
  selected: boolean;
}
export enum DialogConfirm {
  Yes = 'YES',
  No = 'NO',
  Ok = 'OK'
}

export enum DirectionKey {
  None = 0, Enter = 13, Left = 37, Up, Right, Down
}

export class ErrorCode {
  static ServerError = '500';
  static NotFound = '404';
  static Unauthorized = '401';
}
