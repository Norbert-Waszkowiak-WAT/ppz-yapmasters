import { createCustomException } from './response.utils';

class ThrowAuthExceptionClass {
  AllSessionsFetchedSuccessfully(data) {
    throw createCustomException(701, 200, data);
  }
  SessionNotFound(): never {
    throw createCustomException(702, 404);
  }
  AllSessionsDestroyedSuccessfully() {
    throw createCustomException(703, 200);
  }
}

export const throwSessionException = new ThrowAuthExceptionClass();
