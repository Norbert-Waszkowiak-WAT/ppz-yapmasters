import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Patch, Post, Req, Request, UseGuards} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";
import { CreateEventDto } from "./dto/events.dto";
import { EventsService } from "./events.service";
import { UpdateEventDto } from "./dto/update.event.dto";
import { Types } from 'mongoose';
import { rrulestr } from 'rrule';

@Controller('/calendar/events')
  export class EventsController {
    constructor(@InjectModel('user') private readonly Events: Model <Event>,
      private readonly EventService: EventsService,
    ) {}
    @Post('/add')
    @UseGuards(AuthenticatedGuard) // Ensure the user is authenticated
    async addEvent(@Body() addEventDto: CreateEventDto, @Req() req: any) {
     const userId = req.session.passport.user;  
      return this.EventService.createEvent(addEventDto, userId);
    }

    @Patch('/update/:eventId')
@UseGuards(AuthenticatedGuard) // Ensure the user is authenticated
async editEvent(
  @Body() updateEventDto: UpdateEventDto,
  @Req() req: any,
  @Param('eventId') eventId: string
) {
  if (!eventId || !Types.ObjectId.isValid(eventId)) {
    throw new BadRequestException('Invalid event ID');
  }
  try {
    return this.EventService.updateEvent(eventId, updateEventDto);
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException('Event not found');
    }
    throw error;
  }
}
@Get('/getEvents')
@UseGuards(AuthenticatedGuard)
async getAllOccurrences(
  @Body('startDate') startDate: string,
  @Req() req: any,
  @Body('endDate') endDate: string
) {
  if (!startDate || !endDate) {
    throw new BadRequestException('Start date and end date are required');
  }
  const userId = req.session.passport.user; 
  const occurrences = await this.EventService.getAllEventOccurrences(
    new Date(startDate),
    new Date(endDate),
    userId
  );
  return occurrences;
}

@Get('/delete/:eventId')
@UseGuards(AuthenticatedGuard)
async deleteEvent(@Param('eventId') eventId: string) {
  if (!eventId || !Types.ObjectId.isValid(eventId)) {
    throw new BadRequestException('Invalid event ID');
  }
  try {
    return this.EventService.deleteEvent(eventId);
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException('Event not found');
    }
    throw error;
  }
}
}

   