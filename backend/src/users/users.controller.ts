import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    Request,
    UnauthorizedException,
    NotAcceptableException,
    HttpException,
    HttpStatus,
    Param,
  } from '@nestjs/common';
  import * as bcrypt from 'bcrypt';
  import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
  import { LocalAuthGuard } from 'src/auth/local.auth.guard';
  import { UsersService } from './users.service';
  import { EmailService } from 'src/email/email.service';
  @Controller('users')
  export class UsersController {
    
  
    constructor(private readonly usersService: UsersService,
      private readonly EmailService: EmailService
    ) {}
    //signup
    @Post('/register')
    async addUser(
      @Body('password') userPassword: string,
      @Body('username') userName: string,
      @Body('email') userEmail: string
    ) {
      if(await this.usersService.checkUniqueness('email', userEmail)){
        throw new NotAcceptableException('Email already used');
      }
      if(await this.usersService.checkUniqueness('username', userName)){
        throw new NotAcceptableException('Username already used');
      }
      console.log(userEmail);
      console.log(await this.usersService.checkUniqueness('username', userName));
      console.log(await this.usersService.checkUniqueness('email', userEmail));
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);
      const result = await this.usersService.insertUser(
        userName,
        hashedPassword,
        userEmail
      );
      return {
        message: 'Now please verify your email',
        userId: result.id,
        userName: result.username,
        userEmail: result.email

      };
    }
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req,@Body('email') email: string): Promise<any> {
      const user = await this.usersService.getUser(email);
      return {User: user.username,
        message: 'User logged in'};
    }
     //Get / protected
    @UseGuards(AuthenticatedGuard)
    @Get('/protected')
    getHello(@Request() req): string {
      return req.user;
    }
     //Get / logout
     @Get('/session-info')
sessionInfo(@Request() req): any {
  return req.session;
}

    @Get('/logout')
      logout(@Request() req): any {
        req.session.destroy();
        return { message: 'The user session has ended' }
      }
      @Post('verify-sentcode')
      async verifycodesent(@Body('email') email: string, @Body('code') code: string,@Body('password') password: string) {
        const isVerified = await this.usersService.verifyUserEmail(email, code,password);
        if (isVerified) {
          return { message: 'Email verified successfully' };
        } else {
          return { message: 'Invalid verification code' };
        }
      }
      @Post('resend-verification-code')
      async resendVerificationCode(@Body('email') email: string) {
        await this.EmailService.sendVerificationCode(email);
        return { message: 'Verification code sent successfully' };
      }
      @Post('reset-password')
      async Passwordreset(@Body('email') email: string) {
        const token = await this.usersService.generatePasswordResetToken(email);
        if (!token) {
          throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
        }
    const user= await this.usersService.getUser(email);
        // Send the email with the reset link here
        await this.EmailService.sendPasswordResetEmail(email, user.username,token);
    
        return { message: 'Password reset email sent' };
      }
    
      @Post('delete-user')
      async deleteUser(@Body('email') email: string, @Body('password') password: string) {
        const user = await this.usersService.getUser(email);
        if (!user) {
          throw new NotAcceptableException('could not find the user');
        }
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
          throw new UnauthorizedException('Invalid password');
        }
        await this.usersService.deleteUser(user);
        return { message: 'User deleted successfully' };
      }
      
      @Post('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body('password') newPassword: string,
  ) {
    const isReset = await this.usersService.resetPassword(token, newPassword);
    if (!isReset) {
      throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);
    }

    return { message: 'Password reset successfully' };
  }
  }