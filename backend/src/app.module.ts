import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { CalendarModule } from './calender/calendar.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'),
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
     UsersModule,
     AuthModule,
     EmailModule,
     CalendarModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
