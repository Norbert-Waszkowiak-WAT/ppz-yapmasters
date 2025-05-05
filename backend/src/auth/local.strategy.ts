import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { throwException } from 'src/responseStatus/auth.response';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {
    super({ usernameField: 'email' });
  }
  async validate(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUser(email);
    if (!user) {
      throwException.IncorrectEmail();
    }
    const userCredentials = await this.authService.validateUser(
      email,
      password,
    );
    if (!userCredentials) {
      throwException.IncorrectPassword();
    }
    if (user.isEmailverified == false) {
      throwException.EmailNeedsVerification();
    }
    return userCredentials;
  }
}
