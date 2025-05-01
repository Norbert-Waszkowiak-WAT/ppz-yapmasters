import { createCustomException } from './response.utils';

class ThrowAuthExceptionClass {
  EmailNeedsVerification(): never {
    throw createCustomException(
      601 /*Custom response code*/,
      200 /*Status Code  403*/,
    );
  }

  IncorrectEmail(): never {
    throw createCustomException(602, 200);
  }

  IncorrectPassword(): never {
    throw createCustomException(603, 200);
  }
  InvalidVerificationCode(): never {
    throw createCustomException(604, 200);
  }
  EmailVerifiedSuccessfully(): never {
    throw createCustomException(605, 200);
  }
  VerificationCodeSent(): never {
    throw createCustomException(606, 200);
  }
  UsernameAlreadyUsed(): never {
    throw createCustomException(607, 200);
  }
  EmailAlreadyUsed(): never {
    throw createCustomException(608, 200);
  }
  UserloggedIn(data?: any): never {
    throw createCustomException(609, 200, data);
  }
  Usernotfound(): never {
    throw createCustomException(610, 200);
  }
  UserLoggedOutSuccessfully(): never {
    throw createCustomException(611, 200);
  }
  PasswordResetEmailSentSuccessfully(): never {
    throw createCustomException(612, 200);
  }
  InvalidOrExpiredToken(): never {
    throw createCustomException(613, 200);
  }
  PasswordResetSuccessfully(): never {
    throw createCustomException(614, 200);
  }
  PleaseVerifyYourEmail(data?: any): never {
    throw createCustomException(615, 200, data);
  }
  VerificationCodeSentSuccessfully() {
    throw createCustomException(616, 200);
  }
  UserDeletedSuccessfully() {
    throw createCustomException(617, 200);
  }
}

export const throwException = new ThrowAuthExceptionClass();
