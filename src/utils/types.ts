import User, { UserData } from './User';

export interface CurrentUser {
  email: string;
  preferences?: {
    columnsOrder?: (keyof User)[];
    orderByColumn?: keyof UserData;
    orderByDirection?: 'asc' | 'desc';
  }
}
