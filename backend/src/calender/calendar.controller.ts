import { Body, Controller, Get, Post, Req, Request, UseGuards} from "@nestjs/common";
import { CalendarService } from "./calendar.service"
import{ Event} from "./events/events.schema"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateEventDto } from './events/dto/events.dto';
import { AuthenticatedGuard } from "src/auth/authenticated.guard";

@Controller('calendar')
  export class CalendarController {
    constructor(@InjectModel('user') private readonly Events: Model <Event>,
      private readonly CalendarService: CalendarService,
    ) {}
    @Post('/addEvent')
    @UseGuards(AuthenticatedGuard) // Ensure the user is authenticated
    async addEvent(@Body() addEventDto: CreateEventDto, @Req() req: any) {
     const userId = req.session.passport.user;  
      return this.CalendarService.createEvent(addEventDto, userId);
    }
    
}