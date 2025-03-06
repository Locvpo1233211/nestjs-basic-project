import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import {
  permission,
  permissionDocument,
} from 'src/permissions/schemas/permission.schema';
import { role, roleDocument } from 'src/roles/schemas/role.schema';
import { user, userDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { ADMIN_ROLE, INIT_PERMISSIONS, USER_ROLE } from './sample';

@Injectable()
export class DatabasesService implements OnModuleInit {
  constructor(
    @InjectModel(permission.name)
    private permissionMeModel: SoftDeleteModel<permissionDocument>,
    @InjectModel(user.name) private userModel: SoftDeleteModel<userDocument>,
    @InjectModel(role.name)
    private roleModel: SoftDeleteModel<roleDocument>,
    private configService: ConfigService,
    private userService: UsersService,
  ) {}
  async onModuleInit() {
    console.log(`The module has been initialized.`);
    const isCheck = this.configService.get<string>('SHOULD_INIT');
    if (Boolean(isCheck)) {
      const countUser = await this.userModel.count({});
      const countRole = await this.roleModel.count({});
      const countPermission = await this.permissionMeModel.count({});
      if (countPermission === 0) {
        await this.permissionMeModel.insertMany(INIT_PERMISSIONS);
      }
      if (countRole === 0) {
        const permissions = await this.permissionMeModel.find({}).select('_id');
        await this.roleModel.insertMany([
          {
            name: ADMIN_ROLE,
            description: 'Admin Role full quyen',
            isActive: true,
            permissions: permissions,
          },
          {
            name: USER_ROLE,
            description: 'User Role nguoi dung / ung vien',
            isActive: true,
            permissions: [],
          },
        ]);
      }

      if (countUser === 0) {
        const adminRole = await this.roleModel
          .findOne({ name: ADMIN_ROLE })
          .select('_id');
        const userRole = await this.roleModel
          .findOne({ name: USER_ROLE })
          .select('_id');
        console.log('adminRole', adminRole);
        console.log('userRole', userRole);
        await this.userModel.insertMany([
          {
            name: 'i am admin',
            password: this.userService.getHashedPassword('123456'),
            age: 20,
            gender: 'male',
            email: 'admin@gmail.com',
            role: adminRole,
            address: 'hn',
          },
          {
            name: 'i am user IT',
            password: this.userService.getHashedPassword('123456'),
            age: 20,
            gender: 'male',
            email: 'user@gmail.com',
            role: userRole,
            address: 'sg',
          },
        ]);
      }

      if (countUser > 0 && countRole > 0 && countPermission > 0) {
        console.log('Database is already initializedaaaaaa ');
      }
    }
  }
}
