import Rx from 'rxjs';
import { INCREMENT_COUNTER, DECREMENT_COUNTER, COUNTER_REFRESHED } from '../constants/ActionTypes';

export default function counter(state = 0, action = {}) {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return state + 1;
        case DECREMENT_COUNTER:
            return state - 1;
        case COUNTER_REFRESHED:
            return state = action.payload.counter;
        default:
            return state;
    }
}
