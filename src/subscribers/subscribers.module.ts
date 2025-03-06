import { Module } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SubscribersController } from './subscribers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { subscribe } from 'diagnostics_channel';
import { subscriber, subscriberSchema } from './Schemas/subscriber.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: subscriber.name, schema: subscriberSchema },
    ]),
  ],
  controllers: [SubscribersController],
  providers: [SubscribersService],
})
export class SubscribersModule {}
