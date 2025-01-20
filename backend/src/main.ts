import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import * as session from "express-session"
import * as passport from "passport"
import { ValidationPipe } from "@nestjs/common/pipes/validation.pipe"
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(
    session({
      secret: process.env.PASSPORT_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // Set secure: true in production with HTTPS
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Removes extra properties from the request payload
      forbidNonWhitelisted: true, // Throws error if unknown properties are sent
      transform: true // Automatically transform plain objects to DTO instances
    })
  );
  app.use(passport.initialize())
  app.use(passport.session())
 
  await app.listen(3000)
}
bootstrap()