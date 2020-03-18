import * as Rx from 'rxjs';
import Request from '../../api/json/api-json'
const subjects = {
  incrementCounterSubject: new Rx.Subject(),
  decreaseCounterSubject: new Rx.Subject(),
  refreshFromServerCounterSubject: new Rx.Subject(),
};

export default {
  subjects,
  incrementCounter: () => {
    // Increment on server
    Request.get('/counter/increment').subscribe(() => {});
    // Emit that we incremented
    subjects.incrementCounterSubject.next()
  },
  // should rename to decrement
  decreaseCounter: () => {
    Request.get('/counter/decrement').subscribe(() => {});
    subjects.decreaseCounterSubject.next()
  },
  refreshFromServer: () => Request.get('/counter').subscribe(subjects.refreshFromServerCounterSubject.next.bind(subjects.refreshFromServerCounterSubject)),
};
