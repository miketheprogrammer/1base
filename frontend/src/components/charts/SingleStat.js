import React, { Component} from 'react';
import * as Rx from 'rxjs';
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

  makeRequest() {
    const {name, measurement, organization, game, type, user} = this.props;
    let query = `organization=${organization}&game=${game}&type=${type}`
    return Request.get(`/metrics?${query}`)
    .map((result) => {
      return result.sum;
    })
  }

  handleRequest(request$) {
    request$.subscribe((value) => {
      this.setState({value})
    });
  }
  componentDidMount() {
    /*
    ALERT : We should think of passing in the
    interval function from the parent. That
    way we can maintain synced graphs
    */
    const {refreshRate, interval$} = this.props;
    // Make an instant request
    this.handleRequest(this.makeRequest());
    // then refresh at interval
    // let interval$ = Rx.Observable
      // .interval(1000 * refreshRate)
    let update$ = interval$
      .takeUntil(this.destroy$)
      .mergeMap(() => this.makeRequest());
    this.handleRequest(update$)

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
