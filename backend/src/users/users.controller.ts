import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
  Delete,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { UsersService } from './users.service';
import { EmailService } from 'src/email/email.service';
import { throwException } from 'src/responseStatus/auth.response';
import { throwSessionException } from 'src/responseStatus/sessions.response';
import { SessionsService } from 'src/sessions/sessions.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly EmailService: EmailService,
    private readonly sessionService: SessionsService,
  ) {}
  //signup
  @Post('/register')
  async addUser(
    @Body('password') userPassword: string,
    @Body('username') userName: string,
    @Body('email') userEmail: string,
  ) {
    if (await this.usersService.checkUniqueness('email', userEmail)) {
      throwException.EmailAlreadyUsed();
    }
    if (await this.usersService.checkUniqueness('username', userName)) {
      throwException.UsernameAlreadyUsed();
    }
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);
    const result = await this.usersService.insertUser(
      userName,
      hashedPassword,
      userEmail,
    );
    const user = {
      userName: result.username,
      userEmail: result.email,
    };
    throwException.PleaseVerifyYourEmail(user);
  }
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Body('email') email: string): Promise<any> {
    const user = await this.usersService.getUser(email);
    const userId = req.session.passport.user; // Passport sets this after login
    const sessionId = req.session.id; // Get the session ID from Express session

    if (userId && sessionId) {
      await this.sessionService.saveSession(userId, sessionId); // Save session to Redis
    }

    const data = {
      User: user.username,
      email: user.email,
      sessionId: sessionId,
    };
    throwException.UserloggedIn(data);
  }
  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    throwException.UserLoggedOutSuccessfully();
  }
  @Post('verify-sentcode')
  async verifycodesent(
    @Body('email') email: string,
    @Body('code') code: string,
    @Body('password') password: string,
  ) {
    const isVerified = await this.usersService.verifyUserEmail(
      email,
      code,
      password,
    );
    if (isVerified) {
      throwException.EmailVerifiedSuccessfully();
    } else {
      throwException.InvalidVerificationCode();
    }
  }
  @Post('resend-verification-code')
  async resendVerificationCode(@Body('email') email: string) {
    await this.EmailService.sendVerificationCode(email);
    throwException.VerificationCodeSentSuccessfully();
  }
  @Post('reset-password')
  async Passwordreset(@Body('email') email: string) {
    const token = await this.usersService.generatePasswordResetToken(email);
    if (!token) {
      throwException.IncorrectEmail();
    }
    const user = await this.usersService.getUser(email);
    // Send the email with the reset link here
    await this.EmailService.sendPasswordResetEmail(email, user.username, token);

    throwException.PasswordResetEmailSentSuccessfully();
  }

  @Delete('delete-user')
  async deleteUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.usersService.getUser(email);
    if (!user) {
      throwException.Usernotfound();
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throwException.IncorrectPassword();
    }
    await this.usersService.deleteUser(user);
    throwException.UserDeletedSuccessfully();
  }

  @Post('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body('password') newPassword: string,
  ) {
    const isReset = await this.usersService.resetPassword(token, newPassword);
    if (!isReset) {
      throwException.InvalidOrExpiredToken();
    }

    throwException.PasswordResetSuccessfully();
  }
  @UseGuards(AuthenticatedGuard)
  @Delete('destroyallsessions')
  async destroyAllSessions(@Request() req) {
    await this.sessionService.deleteAllSessions(req.session.passport.user);
    throwSessionException.AllSessionsDestroyedSuccessfully();
  }
  @UseGuards(AuthenticatedGuard)
  @Get('getallsessions')
  async getAllSessions(@Request() req) {
    const sessions = await this.sessionService.getSessions(
      req.session.passport.user,
    );
    throwSessionException.AllSessionsFetchedSuccessfully(sessions);
  }
}
