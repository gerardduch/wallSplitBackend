import { Mongoose } from 'mongoose';

export function dropAllCollections(connection: Mongoose): Promise<any> {
  const dropCollectionPromisesArray = Object.keys(connection.models).map((model: string) =>
    connection.model(model).deleteMany({}),
  );
  return Promise.all(dropCollectionPromisesArray);
}
