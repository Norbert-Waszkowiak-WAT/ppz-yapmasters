import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { SessionsService } from '../sessions/sessions.service';
import { throwSessionException } from 'src/responseStatus/sessions.response';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly sessionsService: SessionsService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const sessionId = request.session.id;
    if (!sessionId) {
      throwSessionException.SessionNotFound();
    }
    try {
      await request.session.passport.user;
    } catch {
      throwSessionException.SessionNotFound();
    }
    const userId = request.session.passport.user;

    const sessionExists = await this.sessionsService.checkIfSessionIsValid(
      sessionId,
      userId,
    );
    if (sessionExists) {
      return request.isAuthenticated();
    } else {
      throwSessionException.SessionNotFound();
    }
  }
}
