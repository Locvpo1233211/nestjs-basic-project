import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/users.interface';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import { Response } from 'express';
import { permission } from 'src/permissions/schemas/permission.schema';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private roleService: RolesService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    let isValid = await this.usersService.isValidatePassword(
      pass,
      user.password,
    );
    if (user && isValid) {
      const userRole = user.role as unknown as { _id: string; name: string };
      const temp = await this.roleService.findOne(userRole._id);
      const { password, ...result } = user;

      const objUser = {
        ...user.toObject(),
        permissions: temp?.permissions ?? [],
      };
      return objUser;
    }
    return null;
  }
  async login(user: IUser, res: Response) {
    const { _id, email, name, role, permissions } = user;
    const payload = {
      sub: 'token login',
      iss: 'from server',
      email: user.email,
      _id: user._id,
      name: user.name,
      role: user.role,
    };
    const refreshToken = this.refeshToken(payload);
    await res.cookie('refeshToken', refreshToken, {
      httpOnly: true,
      maxAge: ms(this.configService.get('JWT_REFESH_TOKEN_EXPIRE')),
    });
    await this.usersService.updateUserRefeshToken(user._id, refreshToken);
    console.log('payload', user);
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        email: user.email,
        _id: user._id,
        name: user.name,
        role: user.role,
        permissions: user.permissions,
      },
    };
  }
  async register(user) {
    return this.usersService.create(user);
  }
  refeshToken(payload: any) {
    let refeshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFESH_TOKEN_SECRECT'),
      expiresIn: this.configService.get<number>('JWT_REFESH_TOKEN_EXPIRE'),
    });
    return refeshToken;
  }
  async handleRefresh(refreshToken: string, res: Response) {
    try {
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFESH_TOKEN_SECRECT'),
      });
      let user = await this.usersService.findUserByRefeshToken(refreshToken);
      if (user) {
        const payload = {
          sub: 'token login',
          iss: 'from server',
          email: user.email,
          _id: user._id,
          name: user.name,
          role: user.role,
        };

        const newRefreshToken = this.refeshToken(payload);
        await this.usersService.updateUserRefeshToken(
          user._id.toString(),
          newRefreshToken,
        );
        // fetch userRole
        const userRole = user.role as unknown as { _id: string; name: string };
        const temp = await this.roleService.findOne(userRole._id);
        res.clearCookie('refeshToken');
        res.cookie('refeshToken', newRefreshToken, {
          httpOnly: true,
          secure: false,
          maxAge: ms(this.configService.get('JWT_REFESH_TOKEN_EXPIRE')),
        });

        return {
          access_token: this.jwtService.sign(payload),
          user: {
            email: user.email,
            _id: user._id,
            name: user.name,
            role: user.role,
            permissions: temp?.permissions ?? [],
          },
        };
      } else {
        throw new BadRequestException('Invalid token');
      }
    } catch (e) {
      throw new BadRequestException('Invalid token');
    }
  }
  async logout(refreshToken, user: IUser, res: Response) {
    try {
      let user = await this.usersService.findUserByRefeshToken(refreshToken);
      if (user) {
        res.clearCookie('refeshToken');
        await this.usersService.updateUserRefeshToken(user._id.toString(), '');
        return {
          message: 'Logout successfully',
        };
      } else {
        throw new BadRequestException('Invalid token');
      }
    } catch (e) {
      throw new BadRequestException('Invalid token');
    }
  }
}
