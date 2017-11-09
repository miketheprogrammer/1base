import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Intent from './intents/counter-intent/counter-intent';
import { default as Model } from './models/state-model/state-model';

const handleIncrement = () => { Intent.incrementCounter(); };
const handleDecrease = () => { Intent.decreaseCounter(); };
const handleRefresh = () => { Intent.refreshFromServer(); };
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.setState({});
    this.state$ = Model.subject.subscribe(appState => {
      this.setState({ ...appState });
    });
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
          <button className="btn btn-lg btn-primary" onClick={handleRefresh}>refresh from server</button>
        </div>
      </div>
    );
  }
}

export default App;
