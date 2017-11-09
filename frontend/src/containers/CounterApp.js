import React, { Component } from 'react';
import { bindActionCreators } from '../lib/rx-redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import * as CounterActions from '../actions/CounterActions';


class CounterApp extends Component {
  render() {
    const { counter, dispatch } = this.props;
    return (
      <Counter counter={counter}
        {...bindActionCreators(CounterActions, dispatch)} />
    );
  }
}
export default connect(state => ({
  counter: state.counter
}))(CounterApp);
