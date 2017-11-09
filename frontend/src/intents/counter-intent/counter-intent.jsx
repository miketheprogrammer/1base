import Rx from 'rxjs';
import Request from '../../api/json/api-json'
const subjects = {
  incrementCounterSubject: new Rx.Subject(),
  decreaseCounterSubject: new Rx.Subject(),
  refreshFromServerCounterSubject: new Rx.Subject(),
};

export default {
  subjects,
  incrementCounter: () => {
    Request.get('/counter/increment').subscribe(() => {});
    subjects.incrementCounterSubject.next()
  },
  decreaseCounter: () => {
    Request.get('/counter/decrement').subscribe(() => {});
    subjects.decreaseCounterSubject.next()
  },
  refreshFromServer: () => Request.get('/counter').subscribe(subjects.refreshFromServerCounterSubject.next.bind(subjects.refreshFromServerCounterSubject)),
};
