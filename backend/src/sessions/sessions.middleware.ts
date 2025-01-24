import { Injectable, NestMiddleware } from '@nestjs/common';
import { SessionsService } from '../sessions/sessions.service';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(private readonly sessionsService: SessionsService) {}

  async use(req: any, res: any, next: () => void) {
    const userId = req.session?.passport?.user; // Assuming `req.user` contains the user object
    const sessionId = req.session?.id; // Assuming the session ID is in the request
    if (userId && sessionId) {
      // Renew the session TTL
      await this.sessionsService.renewSessionTTL(userId, sessionId, 2592000); // 30 days TTL
    }

    next();
  }
}
