import { Body, Controller, Get, Patch, Post, Req, Request, UseGuards} from "@nestjs/common";
import { CalendarService } from "./calendar.service"
import{ Event} from "./events/events.schema"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Controller('calendar')
  export class CalendarController {
    constructor(@InjectModel('user') private readonly Events: Model <Event>,
      private readonly CalendarService: CalendarService,
    ) {}
   
}