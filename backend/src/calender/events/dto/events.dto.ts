import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
  IsArray,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @ValidateIf((o) => !o.isOneTimeEvent)
  @IsNotEmpty()
  @IsString()
  RRule?: string;

  @IsNotEmpty()
  @IsBoolean()
  isOneTimeEvent: boolean;

  @ValidateIf((o) => o.isOneTimeEvent)
  @IsNotEmpty()
  @IsString()
  occurrenceDate?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  duration?: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  participants?: string[];

  @IsOptional()
  @IsString()
  colour?: string;

  @IsNotEmpty()
  @IsString()
  timeZone: string;

  @IsNotEmpty()
  @IsString()
  startTime: string;
}
