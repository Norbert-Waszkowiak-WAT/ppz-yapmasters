import { Injectable } from '@nestjs/common';
import { Event } from './events.schema';
import { CreateEventDto } from './dto/events.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateEventDto } from './dto/update.event.dto';
import { RRule } from 'rrule';
import { ObjectId } from 'mongodb';
import { EventOccurrence } from './occurences/event-occurrence.schema';
import { throwEventsException } from 'src/responseStatus/calendar.events.response';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectModel(EventOccurrence.name)
    private readonly eventOccurrencesCollection: Model<EventOccurrence>,
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
      throwEventsException.EventNotFound();
    }
    Object.assign(event, updateEventDto);
    await event.save();
    const result = event.toObject();
    delete result.userId;
    return result;
  }

  async getRecurringEvents(
    startDate: Date,
    endDate: Date,
    userId: string,
  ): Promise<EventOccurrence[]> {
    const now = new Date();

    // 1️⃣ Get precomputed occurrences for the specified user
    const precomputedOccurrences = await this.eventOccurrencesCollection
      .find({
        start: { $gte: startDate, $lte: endDate },
        userId,
      })
      .select({ userId: 0 })
      .exec();

    // 2️⃣ Find newly created events for the user that haven't been precomputed yet
    const newlyCreatedEvents = await this.eventModel
      .find({
        createdAt: { $gte: new Date(now.getTime() - 10 * 60 * 1000) },
        userId,
        RRule: { $exists: true },
      })
      .select({ userId: 0 })
      .exec();

    // 3️⃣ Compute missing occurrences on the fly
    const dynamicOccurrences: EventOccurrence[] = [];
    for (const event of newlyCreatedEvents) {
      const rule = RRule.fromString(event.RRule);
      const computedDates = rule.between(startDate, endDate, true);

      for (const occurrence of computedDates) {
        dynamicOccurrences.push({
          _id: new ObjectId(),
          eventId: event._id,
          start: occurrence,
          timezone: event.timeZone,
          userId: event.userId,
        } as unknown as EventOccurrence);
      }
    }

    // Combine precomputed and dynamic occurrences
    return [...precomputedOccurrences, ...dynamicOccurrences];
  }

  async getOneTimeEvents(startDate: Date, endDate: Date, userId: any) {
    const events = await this.eventModel
      .find({
        userId: userId,
        occurrenceDate: {
          $gt: startDate,
          $lt: endDate,
        },
      })
      .select({ userId: 0 });
    return events;
  }

  async deleteEvent(eventId: string) {
    const event = await this.eventModel.findById(eventId);
    if (!event) {
      throwEventsException.EventNotFound();
    }
    await this.eventModel.findOneAndDelete({ _id: eventId });
    throwEventsException.EventDeletedSuccessfully();
  }

  validateReccuringRules(eventDto: CreateEventDto) {
    if (eventDto.isOneTimeEvent === true) {
      const RRule = eventDto.RRule;
      if (RRule) {
        throwEventsException.RRuleShouldNotExistIfOneTimeEventTrue();
      }
    } else {
      const occurrenceDate = eventDto.occurrenceDate;
      if (occurrenceDate) {
        throwEventsException.OccuranceDateShouldNotExistIfOneTimeEventFalse();
      }
    }
  }
}
