import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/users/users.interface';
import { role } from 'src/roles/schemas/role.schema';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // giai ma token duoc truyen len
  constructor(
    private configService: ConfigService,
    private roleService: RolesService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN'),
    });
  }
  //  sau khi giai ma token thanh cong se truyen vao ham nay
  async validate(payload: IUser) {
    let { _id, name, email, role } = payload;

    const userRole = role as unknown as { _id: string; name: string };
    const temp = (await this.roleService.findOne(userRole._id)).toObject();
    console.log(temp);
    return { _id, name, email, role, permissions: temp?.permissions ?? [] };
  }
}
