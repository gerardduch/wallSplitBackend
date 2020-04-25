import { HookNextFunction, Schema } from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

// NOTE: Arrow functions are not used here as we do not want to use lexical scope for 'this'
UserSchema.pre('save', function(next: HookNextFunction) {
  // todo: find the correct this type
  const user: any = this;

  // Make sure not to rehash the password if it is already hashed
  if (!user.isModified('password')) {
    return next();
  }

  // Generate a salt and use it to hash the user's password
  bcrypt.genSalt(10, async (genSaltErr: Error, salt: string) => {
    if (genSaltErr) {
      return next(genSaltErr);
    }

    bcrypt.hash(user.password, salt, (hashErr: Error, hash: string) => {
      if (hashErr) {
        return next(hashErr);
      }

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.checkPassword = async function(fulfilledPassword: string, callback) {
  const user = this;
  bcrypt.compare(fulfilledPassword, user.password, (err: Error, isMatch: boolean) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};
