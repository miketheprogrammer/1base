import Rx from 'rxjs';
import React, { Component } from 'react';
import { bindActionCreators } from '../lib/rx-redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import * as CounterActions from '../actions/CounterActions';
import './CounterApp.css';
import logo from '../logo.svg';

class CounterApp extends Component {
  constructor(props){
    super(props);
    this.destroy$ = new Rx.Subject();
    this.userhasturned18= new Rx.Subject();
  }
  componentDidMount() {
    CounterActions.refresh();
    Rx.Observable
      .interval(1000)
      .takeUntil(this.destroy$)
      .subscribe(() => {
        CounterActions.refresh();
      });
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

        {/*<h1>counter: {this.state.counter}</h1>
        <button className="btn btn-lg btn-primary" onClick={handleDecrease}>decrease</button>
          {'  '}
        <button className="btn btn-lg btn-primary" onClick={handleIncrement}>increment</button>
          {'  '}
        <button className="btn btn-lg btn-primary" onClick={this.destroy$.next.bind(this.destroy$)}>unsubscribe from updates</button>
        <button className="btn btn-lg btn-primary" onClick={handleRefresh}>refresh from server</button>
        */}
      </div>
    </div>);
  }

}
export default connect(state => ({
  counter: state.counter
}))(CounterApp);
