import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { user, userSchema } from './schemas/user.schema';
import { role, roleSchema } from 'src/roles/schemas/role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: user.name, schema: userSchema }]),
    MongooseModule.forFeature([{ name: role.name, schema: roleSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
