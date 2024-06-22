import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
    const createdUser = new this.userModel({ ...createUserDto, password: hashedPassword });
    return createdUser.save();
  }

  async findByUsername(username: string): Promise<UserDocument | undefined> {
    const user = await this.userModel.findOne({ username }).lean().exec();
    return user ?? undefined;
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().lean().exec();
  }

  async findOne(id: string): Promise<UserDocument | undefined> {
    const user = await this.userModel.findById(id).lean().exec();
    return user ?? undefined;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument | undefined> {
    if (updateUserDto.password) {
      const saltOrRounds = 10;
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, saltOrRounds);
    }
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).lean().exec();
    return user ?? undefined;
  }

  async remove(id: string): Promise<UserDocument | undefined> {
    const user = await this.userModel.findByIdAndDelete(id).lean().exec();
    return user ?? undefined;
  }

  async validatePassword(username: string, password: string): Promise<boolean> {
    const user = await this.findByUsername(username);
    if (!user) {
      return false;
    }
    return bcrypt.compare(password, user.password);
  }
}
