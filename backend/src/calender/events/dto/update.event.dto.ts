import {
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
  IsArray,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @ValidateIf((o) => o.isOneTimeEvent === false)
  @IsOptional()
  @IsString()
  RRule?: string;

  @IsOptional()
  @IsBoolean()
  isOneTimeEvent?: boolean;

  @ValidateIf((o) => o.isOneTimeEvent === true)
  @IsOptional()
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

  @IsOptional()
  @IsString()
  timeZone?: string;

  @IsOptional()
  @IsString()
  startTime?: string;
}
