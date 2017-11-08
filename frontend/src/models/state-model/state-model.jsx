import Rx from 'rxjs';
import IntentCounter from '../../intents/counter-intent/counter-intent';

const subject = new Rx.ReplaySubject(1);

let state = {
  postResult: [],
  results: [],
  counter: 0
};

IntentCounter.subjects.incrementCounterSubject.subscribe(()=> {
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

subject.next(state);

export default {
  subject
};
