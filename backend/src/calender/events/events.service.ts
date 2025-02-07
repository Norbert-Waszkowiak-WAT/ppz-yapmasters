import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from './events.schema';
import { CreateEventDto } from './dto/events.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateEventDto } from './dto/update.event.dto';
//import { rrulestr } from 'rrule';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel('event') private readonly eventModel: Model<Event>,
  ) {}
  async createEvent(addEventDto: CreateEventDto, userId: any) {
    const newEvent = new this.eventModel({
      ...addEventDto,
      userId,
    });
    await newEvent.save();
    const result = newEvent.toObject();
    delete result.userId;
    return result;
  }
  async updateEvent(eventId: string, updateEventDto: UpdateEventDto) {
    const event = await this.eventModel.findById(eventId);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    Object.assign(event, updateEventDto);
    await event.save();
    const result = event.toObject();
    delete result.userId;
    return result;
  }

  /* async getAllEventOccurrences(startDate: Date, endDate: Date, userId: any) {
    const events = await this.eventModel.find({ userId }); // Retrieve all events

    const allOccurrences = [];

    for (const event of events) {
      const eventOccurrences = [];

      // Check if the event has an RRule for recurrence
      if (event.recurring) {
        const rule = rrulestr(event.recurring);
        const occurrences = rule.between(startDate, endDate);
        occurrences.forEach((occurrence) => {
          eventOccurrences.push({
            title: event.title,
            type: event.type,
            description: event.description,
            startDate: occurrence,
            endDate: new Date(
              occurrence.getTime() +
                (event.endDate.getTime() - event.startDate.getTime()),
            ), // Calculate endDate
          });
        });
      } else {
        // If it's not recurring, check if it falls within the range
        if (
          event.startDate >= startDate &&
          (!event.endDate || event.startDate <= endDate)
        ) {
          eventOccurrences.push({
            title: event.title,
            type: event.type,
            description: event.description,
            startDate: event.startDate,
            endDate: event.endDate,
          });
        }
      }

      // Add event's occurrences to the main list
      allOccurrences.push(...eventOccurrences);
    }

    return allOccurrences;
  }
  async deleteEvent(eventId: string) {
    const event = await this.eventModel.findById(eventId);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    await this.eventModel.findOneAndDelete({ _id: eventId });
    return { message: 'Event deleted successfully' };
  }
   */
}
