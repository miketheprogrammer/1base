import React, { Component } from 'react';
import Rx from 'rxjs';
import logo from './logo.svg';
import './App.css';
import IntentCounter from './intents/counter-intent/counter-intent';
import Request from './api/json/api-json'
import { default as Model } from './models/state-model/state-model';

const handleIncrement = () => { IntentCounter.incrementCounter(); };
const handleDecrease = () => { IntentCounter.decreaseCounter(); };
const handleRefresh = () => { IntentCounter.refreshFromServer(); };
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.destroy$ = { next: () => {}}
  }
  componentDidMount() {
    this.state$ = Model.subject.subscribe(appState => {
      this.setState({ ...appState });
    });
    this.destroy$ = new Rx.Subject();
    Rx.Observable
      .interval(1000)
      .takeUntil(this.destroy$)
      .subscribe(() => {
        IntentCounter.refreshFromServer();
      });
  }

  componentWillUnmount() {
    this.destroy$.next(1);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="center-block text-center">
          <h1>counter: {this.state.counter}</h1>
          <button className="btn btn-lg btn-primary" onClick={handleDecrease}>decrease</button>
            {'  '}
          <button className="btn btn-lg btn-primary" onClick={handleIncrement}>increment</button>
            {'  '}
          <button className="btn btn-lg btn-primary" onClick={this.destroy$.next.bind(this.destroy$)}>unsubscribe from updates</button>
          <button className="btn btn-lg btn-primary" onClick={handleRefresh}>refresh from server</button>
        </div>
      </div>
    );
  }
}

export default App;
