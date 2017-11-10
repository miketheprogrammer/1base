import Rx from 'rxjs';
import isPlainObject from './isPlainObject';

export default function createStore(reducer, initState) {
  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  const initAction = {type: '@@rx-redux/INIT_' + (new Date()).getTime()};
  const listeners = [];
  const dispatcher$ = new Rx.Subject();

  let currentReducer = reducer;
  let state = currentReducer(initState, initAction);

  function callListeners() {
    listeners.forEach(listener => listener());
  }

  function dispatch(action, confirm) {
    // console.log('dispatch', action, confirm);
    dispatcher$.next(action);
    return action;
  }

  function subscribe(listener) {
    listeners.push(listener);

    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  function replaceReducer(newReducer) {
    currentReducer = newReducer;
    dispatcher$.next(initAction);
  }

  function reduce(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects.');
    }

    state = currentReducer(state, action);

    return state;
  }

  const state$ = dispatcher$.map(reduce).publish().refCount().startWith(state);

  // must call state$.subscribe() to start life cycle
  state$.subscribe(
    callListeners,
    err => { throw err; }
  );

  return {
    state$,
    dispatcher$,
    getState: () => state,
    dispatch,
    subscribe,
    getReducer: () => currentReducer,
    replaceReducer
  };
}
