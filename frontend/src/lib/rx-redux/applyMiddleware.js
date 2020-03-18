import * as Rx from 'rxjs';
import compose from './compose';

function createNewDispatch(middleware, store) {
  /*
  might need to add some sort of lazy map here so we have the most recent store function
  currently actions as results of actions dont trigger middleware, they just go to the reducer.
  or maybe using actual redux will fix this.
  */
  const dispatchFunctions = middleware.map(m => m(store));
  dispatchFunctions.push(store.dispatch);
  // console.log('createNewDispatch', dispatchFunctions);
  return compose(...dispatchFunctions);
}

function createNewDispatcher(middleware, store) {
  const newDispatch = createNewDispatch(middleware, store);
  const newDispatcher$ = new Rx.Subject();
  newDispatcher$.subscribe((action) => {
    // console.log('new dispatcher', action);
    return newDispatch(action)
  });

  return newDispatcher$;
}

export default function applyMiddleware(...middleware) {
  return (createStore) => (reducer, initState) => {
    const store = createStore(reducer, initState);
    const newDispatcher$ = createNewDispatcher(middleware, store);

    store.dispatcher$ = newDispatcher$;
    store.dispatch = (action) => {
      // console.log('dispatch2', action);
      newDispatcher$.next(action);
      return action;
    };

    return store;
  };
}
