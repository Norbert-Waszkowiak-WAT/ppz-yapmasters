import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { CreateEventDto } from './dto/events.dto';
import { EventsService } from './events.service';
import { UpdateEventDto } from './dto/update.event.dto';
import { Types } from 'mongoose';
import { throwEventsException } from 'src/responseStatus/calendar.events.response';
@Controller('/calendar/events')
export class EventsController {
  constructor(
    @InjectModel(Event.name) private readonly Events: Model<Event>,
    private readonly EventService: EventsService,
  ) {}
  @Post('/add')
  @UseGuards(AuthenticatedGuard) // Ensure the user is authenticated
  async addEvent(@Body() addEventDto: CreateEventDto, @Req() req: any) {
    const userId = req.session.passport.user;
    await this.EventService.validateReccuringRules(addEventDto);
    return this.EventService.createEvent(addEventDto, userId);
  }

  @Patch('/update/:eventId')
  @UseGuards(AuthenticatedGuard) // Ensure the user is authenticated
  async editEvent(
    @Body() updateEventDto: UpdateEventDto,
    @Req() req: any,
    @Param('eventId') eventId: string,
  ) {
    if (!eventId || !Types.ObjectId.isValid(eventId)) {
      throwEventsException.InvalidEventId();
    }
    return this.EventService.updateEvent(eventId, updateEventDto);
  }

  @Get('/getEvents')
  @UseGuards(AuthenticatedGuard)
  async getAllOccurrences(
    @Body('startDate') startDate: string,
    @Req() req: any,
    @Body('endDate') endDate: string,
  ) {
    let events = {};
    const userId = req.session.passport.user;
    const oneTimeEvents = await this.EventService.getOneTimeEvents(
      new Date(startDate),
      new Date(endDate),
      userId,
    );
    const recurringEvents = await this.EventService.getRecurringEvents(
      new Date(startDate),
      new Date(endDate),
      userId,
    );
    events = { ...oneTimeEvents, ...recurringEvents };
    return events;
  }

  @Get('/delete/:eventId')
  @UseGuards(AuthenticatedGuard)
  async deleteEvent(@Param('eventId') eventId: string) {
    if (!eventId || !Types.ObjectId.isValid(eventId)) {
      throwEventsException.InvalidEventId();
    }
    return this.EventService.deleteEvent(eventId);
  }
}
