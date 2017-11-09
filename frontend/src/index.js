import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import NavBar from './components/navbar/navbar';
import { default as Model } from './models/state-model/state-model';

class Root extends Component {
  componentDidMount() {
    this.setState({counter: 0})
    Model.subject.subscribe(appState => {
      console.log('setting state', appState);
      this.setState({ ...appState });
    });
  }

  render() {
    console.log(this.props, this.state);
    console.log(this.props.children);
    const { counter } = this.state || {};
// this code was in the jsxhtml below
//{React.cloneElement(this.props.children, { ...this.state })}
    return (
      <div className="container theme-showcase">
        <NavBar counter={counter} />

      </div>
    );
  }
}

ReactDOM.render((
  <BrowserRouter>
    <div>
      <Root/>
      <Switch>
        <div>
         <Route exact path="/" component={App}/>
        </div>
       {/*<Route component={Home}/>*/}
      </Switch>
    </div>
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
