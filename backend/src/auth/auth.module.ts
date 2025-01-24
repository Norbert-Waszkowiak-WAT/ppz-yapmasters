import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { SessionsModule } from 'src/sessions/sessions.module';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ session: true }),
    SessionsModule,
  ],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
