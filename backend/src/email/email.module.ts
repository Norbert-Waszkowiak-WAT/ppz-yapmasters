import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userModel } from 'src/users/users.schema';
import { EmailController } from './email.controller';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: userModel }])],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
