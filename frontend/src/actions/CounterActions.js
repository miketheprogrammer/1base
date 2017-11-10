import { INCREMENT_COUNTER, DECREMENT_COUNTER, REFRESH_COUNTER, INCREMENT_COUNTER_IF_ODD } from '../constants/ActionTypes';

export function increment() {
    return {
        type: INCREMENT_COUNTER
    };
}

export function decrement() {
    return {
        type: DECREMENT_COUNTER
    };
}

export function refresh() {
  return {
    type: REFRESH_COUNTER
  }
}

export function incrementIfOdd() {
  return {
    type: INCREMENT_COUNTER_IF_ODD
  }
}
