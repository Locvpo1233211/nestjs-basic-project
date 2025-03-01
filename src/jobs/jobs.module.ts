import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { job, jobSchema } from './schemas/job.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: job.name, schema: jobSchema }])],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
