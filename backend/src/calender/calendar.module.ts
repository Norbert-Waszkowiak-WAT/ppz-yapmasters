import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { user, userModel } from 'src/users/users.schema';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { EventSchema } from './events/events.schema';
import { EventsModule } from './events/events.module';
import {
  EventOccurrence,
  EventOccurrenceSchema,
} from './events/occurences/event-occurrence.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: user.name, schema: userModel }]),
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    MongooseModule.forFeature([
      { name: EventOccurrence.name, schema: EventOccurrenceSchema },
    ]),
    EventsModule,
  ],
  controllers: [CalendarController],
  providers: [CalendarService],
  exports: [CalendarService],
})
export class CalendarModule {}
