import Rx from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../constants/ActionTypes';

export const incrementEpic = action$ => {
  return action$.filter(action => action.type === INCREMENT_COUNTER)
    .mapTo({ type: "replace with decrement for example" });
}


export const rootEpic = combineEpics(
  incrementEpic,
);
