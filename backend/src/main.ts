import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import Redis from 'ioredis';
import { RedisStore } from 'connect-redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Create Redis client
  const redis = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');

  // Configure session
  app.use(
    session({
      store: new RedisStore({ client: redis }),
      secret: process.env.PASSPORT_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // Set secure: true in production with HTTPS
    }),
  );

  // Initialize Passport
  await app.use(passport.initialize());

  // Persist sessions across restarts
  await app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
