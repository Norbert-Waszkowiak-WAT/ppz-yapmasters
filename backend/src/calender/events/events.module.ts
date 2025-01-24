import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userModel } from 'src/users/users.schema';
import { EventSchema } from './events.schema';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { SessionsModule } from 'src/sessions/sessions.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: userModel }]),
    MongooseModule.forFeature([{ name: 'event', schema: EventSchema }]),
    SessionsModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
