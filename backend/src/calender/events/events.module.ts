import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { user, userModel } from 'src/users/users.schema';
import { EventSchema } from './events.schema';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { SessionsModule } from 'src/sessions/sessions.module';
import {
  EventOccurrence,
  EventOccurrenceSchema,
} from './occurences/event-occurrence.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: user.name, schema: userModel }]),
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    MongooseModule.forFeature([
      { name: EventOccurrence.name, schema: EventOccurrenceSchema },
    ]),
    SessionsModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
