import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionSerializer } from './session.serializer';

@Module({
  providers: [SessionsService, SessionSerializer],
  exports: [SessionsService, SessionSerializer], // Export to make it accessible in other modules
})
export class SessionsModule {}
