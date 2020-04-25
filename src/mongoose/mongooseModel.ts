import { omit } from 'lodash';

export function cleanMongoDBId(record: any): any {
  return {
    ...omit(record, ['_id', 'password']),
    id: record._id.toString(),
  };
}
