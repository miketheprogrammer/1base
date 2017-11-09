import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css';
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker';
import NavBar from './components/navbar/navbar';

ReactDOM.render((
  <BrowserRouter>
    <div>
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
