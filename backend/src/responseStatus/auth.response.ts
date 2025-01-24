import { createCustomException } from './response.utils';

class ThrowAuthExceptionClass {
  EmailNeedsVerification(): never {
    throw createCustomException(
      601 /*Custom response code*/,
      422 /*Status Code  403*/,
    );
  }

  IncorrectEmail(): never {
    throw createCustomException(602, 401);
  }

  IncorrectPassword(): never {
    throw createCustomException(603, 401);
  }
  InvalidVerificationCode(): never {
    throw createCustomException(604, 401);
  }
  EmailVerifiedSuccessfully(): never {
    throw createCustomException(605, 200);
  }
  VerificationCodeSent(): never {
    throw createCustomException(606, 200);
  }
  UsernameAlreadyUsed(): never {
    throw createCustomException(607, 409);
  }
  EmailAlreadyUsed(): never {
    throw createCustomException(608, 409);
  }
  UserloggedIn(data?: any): never {
    throw createCustomException(609, 200, data);
  }
  Usernotfound(): never {
    throw createCustomException(610, 404);
  }
  UserLoggedOutSuccessfully(): never {
    throw createCustomException(611, 200);
  }
  PasswordResetEmailSentSuccessfully(): never {
    throw createCustomException(612, 200);
  }
  InvalidOrExpiredToken(): never {
    throw createCustomException(613, 401);
  }
  PasswordResetSuccessfully(): never {
    throw createCustomException(614, 200);
  }
  PleaseVerifyYourEmail(data?: any): never {
    throw createCustomException(615, 202, data);
  }
  VerificationCodeSentSuccessfully() {
    throw createCustomException(616, 200);
  }
  UserDeletedSuccessfully() {
    throw createCustomException(617, 200);
  }
}

export const throwException = new ThrowAuthExceptionClass();
