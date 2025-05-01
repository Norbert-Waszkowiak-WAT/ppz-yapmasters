import { createCustomException } from './response.utils';

class ThrowAuthExceptionClass {
  AllSessionsFetchedSuccessfully(data) {
    throw createCustomException(701, 200, data);
  }

  SessionNotFound(): never {
    throw createCustomException(702, 200);
  }

  AllSessionsDestroyedSuccessfully() {
    throw createCustomException(703, 200);
  }

  SessionStatusFetchedSuccessfully(isSessionActive: boolean) {
    throw createCustomException(704, 200, isSessionActive);
  }

  UserInfoFetchedSuccessfully(user: any) {
    throw createCustomException(705, 200, user);
  }
}

export const throwSessionException = new ThrowAuthExceptionClass();
