import Rx from 'rxjs';
import IntentCounter from '../../intents/counter-intent/counter-intent';
import Request from '../../api/json/api-json'

const subject = new Rx.ReplaySubject(1);

let state = {
  postResult: [],
  results: [],
  counter: 0
};

IntentCounter.subjects.incrementCounterSubject.subscribe(()=> {
  // eagerly increment state, even though we will refresh from server.
  // this is so the user will always see an immediate change.
  state = {
    postResult: state.postResult,
    results: state.results,
    counter: state.counter + 1,
  }
  subject.next(state);
});

IntentCounter.subjects.decreaseCounterSubject.subscribe(()=> {
  state = {
    postResult: state.postResult,
    results: state.results,
    counter: state.counter - 1,
  }
  subject.next(state);
});

IntentCounter.subjects.refreshFromServerCounterSubject.subscribe((serverState) => {
  state = {
    postResult: state.postResult,
    results: state.results,
    counter: serverState.counter,
  }
  subject.next(state);
})

subject.next(state);

export default {
  subject
};
