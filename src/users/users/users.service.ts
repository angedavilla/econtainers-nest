import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {


  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(user: User): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    const newUser = new this.userModel({ ...user, password: hashedPassword });
    return await newUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const existingUser = await this.userModel.findById(id);
    if (!existingUser) {
      return null;
    }

    if (!user.password) {
      user.password = existingUser.password;
    } else {
      user.password = await bcrypt.hash(user.password, 10);
    }


    const updatedUser = await this.userModel.findByIdAndUpdate(id, user, { new: true });

    return updatedUser;
  }
  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
