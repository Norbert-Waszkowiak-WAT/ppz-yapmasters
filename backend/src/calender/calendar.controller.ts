import { Controller } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { Event } from './events/events.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { user } from 'src/users/users.schema';

@Controller('calendar')
export class CalendarController {
  constructor(
    @InjectModel(user.name) private readonly Events: Model<Event>,
    private readonly CalendarService: CalendarService,
  ) {}
}
