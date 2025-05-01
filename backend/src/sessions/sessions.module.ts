import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionSerializer } from './session.serializer';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { userModel } from 'src/users/users.schema';
import { SesssionController } from './sessions.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: userModel }])],
  controllers: [SesssionController],
  providers: [SessionsService, SessionSerializer],
  exports: [SessionsService, SessionSerializer],
})
export class SessionsModule {}
