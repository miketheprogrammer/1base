import Rx from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import { INCREMENT_COUNTER, DECREMENT_COUNTER, REFRESH_COUNTER, COUNTER_REFRESHED } from '../constants/ActionTypes';
import Request from '../api/json/api-json'

export const incrementEpic = action$ =>
  action$
    .filter(action => action.type === INCREMENT_COUNTER)
    .mergeMap(action =>
      Request.get('/counter/increment')
      .map(() => { return {type: 'NOOP'}})
    )

export const decrementEpic = action$ =>
  action$
    .filter(action => action.type === DECREMENT_COUNTER)
    .mergeMap(action =>
        Request.get('/counter/decrement')
        .map(() => {return {type: 'NOOP'}})
    )

export const refreshEpic = action$ =>
  action$
    .filter(action => action.type === REFRESH_COUNTER)
    .mergeMap(action =>
      Request.get('/counter/decrement')
      .map((result) => { return {type: COUNTER_REFRESHED, payload: result} })
    )

export const rootEpic = combineEpics(
  incrementEpic,
  decrementEpic,
);
