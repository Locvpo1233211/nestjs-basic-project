import { Module } from '@nestjs/common';
import { DatabasesService } from './databases.service';
import { DatabasesController } from './databases.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  permission,
  permissionSchema,
} from 'src/permissions/schemas/permission.schema';
import { user, userSchema } from 'src/users/schemas/user.schema';
import { role, roleSchema } from 'src/roles/schemas/role.schema';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: permission.name, schema: permissionSchema },
      { name: user.name, schema: userSchema },
      { name: role.name, schema: roleSchema },
    ]),
  ],
  controllers: [DatabasesController],
  providers: [DatabasesService, UsersService],
})
export class DatabasesModule {}
