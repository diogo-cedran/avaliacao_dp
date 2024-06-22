import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserDocument } from '../users/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && await this.usersService.validatePassword(username, pass)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserDocument) {
    const payload = { username: user.username, sub: user._id.toString() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.usersService.create(createUserDto);
    const payload = { username: user.username, sub: user._id.toString() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
