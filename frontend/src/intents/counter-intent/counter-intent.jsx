import Rx from 'rxjs';
import Request from '../../api/json/api-json'
const subjects = {
  incrementCounterSubject: new Rx.Subject(),
  decreaseCounterSubject: new Rx.Subject(),
  refreshFromServerCounterSubject: new Rx.Subject(),
};

export default {
  subjects,
  incrementCounter: () => subjects.incrementCounterSubject.next(),
  decreaseCounter: () => subjects.decreaseCounterSubject.next(),
  refreshFromServer: () => Request.get('').subscribe(subjects.refreshFromServerCounterSubject.next.bind(subjects.refreshFromServerCounterSubject)),
};
