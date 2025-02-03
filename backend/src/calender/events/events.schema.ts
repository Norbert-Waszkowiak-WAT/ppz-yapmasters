import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  type: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  userId: string; // Reference to the user

  @Prop()
  RRule?: string; // Store RRule as a string

  @Prop({ required: true })
  isOneTimeEvent: boolean;

  @Prop({ required: false })
  occurrenceDate?: string;

  @Prop({ required: false })
  duration: number; // Duration of the event in minutes

  @Prop()
  location?: string;

  @Prop()
  participants?: [string];

  @Prop({ default: '#007bff' })
  colour: string;

  @Prop({ required: true })
  timeZone: string;

  @Prop({ required: true })
  startTime: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);

EventSchema.index({ userId: 1, startDate: 1 });
