import { Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { IUser } from 'src/users/users.interface';
import { subscriber, subscriberDocument } from './Schemas/subscriber.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectModel(subscriber.name)
    private subscribeModel: SoftDeleteModel<subscriberDocument>,
  ) {}
  async create(createSubscriberDto: CreateSubscriberDto, user: IUser) {
    console.log('email', user);
    let email = user.email;
    return await this.subscribeModel.create({
      email: email,
      skills: createSubscriberDto.skills,
    });
  }

  findAll() {
    return `This action returns all subscribers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscriber`;
  }

  update(id: number, updateSubscriberDto: UpdateSubscriberDto) {
    return `This action updates a #${id} subscriber`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscriber`;
  }
}
