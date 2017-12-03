import React, { Component} from 'react';
import Rx from 'rxjs';
import Request from '../../api/json/api-json';
/*
.mergeMap(action =>
  Request.post('/register', action.payload)
  .map((result) => { return {type: USER_REGISTERED, payload: result}; })
);
*/
class SingleStat extends Component {
  constructor (props) {
    super(props);
    this.destroy$ = new Rx.Subject();
    this.state = {
      value: props.value || 0
    };
  }

  componentDidMount() {
    /*
    ALERT : We should think of passing in the
    interval function from the parent. That
    way we can maintain synced graphs
    */
    const {refreshRate, name, measurement, organization, game, type, user} = this.props;
    let query = `organization=${organization}&game=${game}&type=${type}`
    Rx.Observable
      .interval(1000 * refreshRate)
      .takeUntil(this.destroy$)
      .mergeMap(action =>
        Request.get(`/metrics?${query}`, action.payload)
        .map((result) => {
          return result.sum;
        })
      )
      .subscribe((value) => {
        this.setState({value})
      });
  }

  componentWillUnmount() {
    this.destroy$.next(null);
  }

  render() {
    return (
      <div
        className="flex-container center-align">
        <p
          className="flex-item">{this.state.value}</p>
      </div>
    )
  }
}

export default SingleStat
