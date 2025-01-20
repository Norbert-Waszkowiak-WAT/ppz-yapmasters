import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { UsersService } from './users.service';
import { EmailService } from 'src/email/email.service';
import { throwException } from 'src/responseStatus/auth.response';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly EmailService: EmailService,
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
  login(@Request() req): any {
    return {
      message: 'User logged in',
      userName: req.user.username,
      userEmail: req.user.email,
      sessionId: req.session.id,
    };
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

  @Post('delete-user')
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
}
