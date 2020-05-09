import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from '../constants';
import { appConfiguration } from 'src/config/server';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONGODB_URI || appConfiguration.defaultMongoDbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }),
  },
];
