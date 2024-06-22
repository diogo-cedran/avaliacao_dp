import { Injectable, NotFoundException } from '@nestjs/common'; // Adicione NotFoundException aqui
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {  // ID como string
    return this.userModel.findById(id).exec();
  }

  async remove(id: string): Promise<void> {  // ID como string
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {  // ID como string
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }
}
