import { createCustomException } from './response.utils';

class ThrowEventExceptionClass {
  EventDeletedSuccessfully() {
    throw createCustomException(801, 200);
  }
  InvalidEventId() {
    throw createCustomException(802, 400);
  }
}

export const throwEventsException = new ThrowEventExceptionClass();
