import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { userModel } from './users.schema';
import { UsersService } from './users.service';
import { EmailModule } from 'src/email/email.module';
import { SessionsModule } from 'src/sessions/sessions.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: userModel }]),
    EmailModule,
    SessionsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
