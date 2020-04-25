import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { cleanMongoDBId } from '../mongoose/mongooseModel';
import { USER_MODEL } from '../constants';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_MODEL) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    const res: any = await createdUser.save();
    return cleanMongoDBId(res._doc);
  }

  findOneByEmail(email): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }
}
