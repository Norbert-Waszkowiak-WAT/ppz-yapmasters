import { createCustomException } from './response.utils';

class ThrowEventExceptionClass {
  EventDeletedSuccessfully() {
    throw createCustomException(801, 200);
  }
  InvalidEventId() {
    throw createCustomException(802, 400);
  }
  EventNotFound() {
    throw createCustomException(803, 404);
  }
  EventCreatedSuccessfully() {
    throw createCustomException(804, 201);
  }
  RRuleShouldNotExistIfOneTimeEventTrue() {
    throw createCustomException(880, 400);
  }
  OccuranceDateShouldNotExistIfOneTimeEventFalse() {
    throw createCustomException(881, 400);
  }
}

export const throwEventsException = new ThrowEventExceptionClass();
