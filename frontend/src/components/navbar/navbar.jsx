import React, { PropTypes } from 'react';
import { Link, Route } from 'react-router-dom';
import Home from '../../routes/home';
import About from '../../routes/about';
const NavBar = ({ counter }) => (
  <nav className="navbar navbar-default">
    <div className="container">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/">React RxJS</Link>
      </div>
      <div className="navbar-collapse collapse">
        <ul className="nav navbar-nav">
          <li><Link to="/">Home</Link></li>
        </ul>
        <button className="btn btn-default navbar-btn">counter: {counter}</button>
      </div>
    </div>
  </nav>
);

export default NavBar;
