import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    let isValid = this.usersService.isValidatePassword(pass, user.password);
    if (user && isValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    console.log('user', user);
    const payload = {
      sub: 'token login',
      iss: 'from server',
      mail: user._doc.email,
      id: user._doc._id,
      name: user._doc.name,
      role: user._doc.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      mail: user._doc.email,
      id: user._doc._id,
      name: user._doc.name,
      role: user._doc.role,
    };
  }
}
