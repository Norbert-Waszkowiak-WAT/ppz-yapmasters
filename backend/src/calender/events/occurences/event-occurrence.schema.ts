import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EventOccurrenceDocument = EventOccurrence & Document;

@Schema()
export class EventOccurrence {
  @Prop({ type: Types.ObjectId, ref: Event.name, required: true })
  eventId: string;

  @Prop({ required: true })
  start: Date;

  @Prop({ required: true })
  end: Date;

  @Prop({ required: true })
  timezone: string;

  @Prop({ required: true })
  userId: string;
}

export const EventOccurrenceSchema =
  SchemaFactory.createForClass(EventOccurrence);
