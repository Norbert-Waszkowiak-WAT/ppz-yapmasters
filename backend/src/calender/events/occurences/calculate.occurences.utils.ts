import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RRule } from 'rrule';
import { Event } from 'src/calender/events/events.schema';
import {
  EventOccurrence,
  EventOccurrenceDocument,
} from './event-occurrence.schema';

@Injectable()
export class EventSchedulerService implements OnModuleInit {
  private readonly updateInterval = parseInt(process.env.INTERVAL) || 86400000; // Default: 24 hours

  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectModel(EventOccurrence.name)
    private readonly occurrenceModel: Model<EventOccurrenceDocument>,
  ) {}

  async updateNextOccurrences() {
    const now = new Date();
    const futureLimit = new Date();
    futureLimit.setFullYear(now.getFullYear() + 1); // Generate for the next year

    // Fetch all events
    const events = await this.eventModel.find().exec();
    const bulkOps = [];

    for (const event of events) {
      const rule = RRule.fromString(event.RRule);
      const occurrences = rule.between(now, futureLimit, true); // Get future occurrences

      for (const occurrence of occurrences) {
        bulkOps.push({
          updateOne: {
            filter: { eventId: event._id, start: occurrence },
            update: {
              $set: {
                eventId: event._id,
                start: occurrence,
                end: new Date(
                  occurrence.getTime() + event.duration * 60 * 1000,
                ),
                timezone: event.timeZone,
                userId: event.userId,
              },
            },
            upsert: true,
          },
        });
      }
    }

    if (bulkOps.length) {
      await this.occurrenceModel.bulkWrite(bulkOps);
    }
  }

  onModuleInit() {
    setInterval(() => this.updateNextOccurrences(), this.updateInterval);
  }
}
