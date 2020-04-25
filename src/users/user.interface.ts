import { Document } from 'mongoose';

export interface StoredUser extends Document {
  id: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;

  // todo: this should be a contract
  checkPassword: any;
}

export type User = Omit<StoredUser, 'password'>;
