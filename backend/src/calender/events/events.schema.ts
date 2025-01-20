import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema()
export class Event {
  @Prop({ required: true })
  title: string;
  @Prop({required: true})
  type: string;
  @Prop()
  description?: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: false })
  endDate: Date;

  @Prop({ required: true })
  userId: string; // Reference to the user
  @Prop()
  recurring?: string; // Store RRule as a string
  @Prop ({required: false})
  occurrenceDate:string;
}

export const EventSchema = SchemaFactory.createForClass(Event);

EventSchema.index({ userId: 1, startDate: 1 });