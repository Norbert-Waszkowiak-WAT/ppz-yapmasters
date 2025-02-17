import { throwSessionException } from 'src/responseStatus/sessions.response';
import { SessionsService } from 'src/sessions/sessions.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { Controller, UseGuards, Get, Request } from '@nestjs/common';
@Controller('sessions')
export class SesssionController {
  constructor(private readonly sessionService: SessionsService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('getallsessions')
  async getAllSessions(@Request() req) {
    const sessions = await this.sessionService.getSessions(
      req.session.passport.user,
    );
    throwSessionException.AllSessionsFetchedSuccessfully(sessions);
  }

  @Get('issessionactive')
  async checkIfSessionIsActive(@Request() req) {
    const isSessionActive = await this.sessionService.checkIfSessionIsActive(
      req.session.id,
    );
    if (isSessionActive) {
      throwSessionException.SessionStatusFetchedSuccessfully(true);
    }
    throwSessionException.SessionNotFound();
  }

  @Get('getuserinfo')
  async getUserInfo(@Request() req) {
    const user = await this.sessionService.getUserInfo(
      req.session.passport.user,
    );
    throwSessionException.UserInfoFetchedSuccessfully(user);
  }
}
