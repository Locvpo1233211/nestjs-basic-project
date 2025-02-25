import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    console.log('user', user);
    let isValid = await this.usersService.isValidatePassword(
      pass,
      user.password,
    );
    if (user && isValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: IUser) {
    const payload = {
      sub: 'token login',
      iss: 'from server',
      email: user.email,
      _id: user._id,
      name: user.name,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      email: user.email,
      _id: user._id,
      name: user.name,
      role: user.role,
    };
  }
  async register(user) {
    console.log('here', user);
    return this.usersService.create(user);
  }
}
