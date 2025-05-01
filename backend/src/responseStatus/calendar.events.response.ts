import { createCustomException } from './response.utils';

class ThrowEventExceptionClass {
  EventDeletedSuccessfully() {
    throw createCustomException(801, 200);
  }
  InvalidEventId() {
    throw createCustomException(802, 200);
  }
  EventNotFound() {
    throw createCustomException(803, 200);
  }
  EventCreatedSuccessfully() {
    throw createCustomException(804, 200);
  }
  RRuleShouldNotExistIfOneTimeEventTrue() {
    throw createCustomException(880, 200);
  }
  OccuranceDateShouldNotExistIfOneTimeEventFalse() {
    throw createCustomException(881, 200);
  }
}

export const throwEventsException = new ThrowEventExceptionClass();
