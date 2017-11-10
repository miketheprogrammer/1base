import Rx from 'rxjs';
import React, { Component } from 'react';
// import { bindActionCreators } from '../lib/rx-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import * as CounterActions from '../actions/CounterActions';
import './CounterApp.css';
import logo from '../logo.svg';

class CounterApp extends Component {
  constructor(props){
    super(props);
    this.setState({});
    this.destroy$ = new Rx.Subject();
  }
  componentDidMount() {
    Rx.Observable
      .interval(1000)
      .takeUntil(this.destroy$)
      .subscribe(() => {
        if (this.props.dispatch) {
         this.props.dispatch(CounterActions.refresh())
       } else console.warn('we dont have dispatch')
      });
  }
  componentWillUnmount() {
    this.destroy$.next(null);
  }
  render() {
    const { counter, dispatch } = this.props;
    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <div className="center-block text-center">
        <Counter counter={counter}
          {...bindActionCreators(CounterActions, dispatch)} />
      </div>
    </div>)
  }

}
export default connect(state => ({
  counter: state.counter
}))(CounterApp);
