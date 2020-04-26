import { Mongoose } from 'mongoose';
import { testDatabaseProviders } from './database/testDatabase.providers';
import { TestDatabaseModule } from './database/testDatabase.module';
import { usersProviders } from '../users/user.providers';

export const mongoTestingProviders = [...testDatabaseProviders, ...usersProviders];
export const mongoTestingImports = [TestDatabaseModule];

export function dropAllCollections(connection: Mongoose): Promise<any> {
  const dropCollectionPromisesArray = Object.keys(connection.models).map((model: string) =>
    connection.model(model).deleteMany({}),
  );
  return Promise.all(dropCollectionPromisesArray);
}
