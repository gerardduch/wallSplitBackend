import { connect, Mongoose } from 'mongoose';
import { DATABASE_CONNECTION } from '../../constants';

export const testDatabaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (): Promise<Mongoose> =>
      connect('mongodb://localhost/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }),
  },
];
