// import React, { PropTypes } from 'react';
// import { Link, Route } from 'react-router-dom';
// const NavBar = ({ counter }) => (
//   <nav className="navbar navbar-default">
//     <div className="container">
//       <div className="navbar-header">
//         <Link className="navbar-brand" to="/">React RxJS</Link>
//       </div>
//       <div className="navbar-collapse collapse">
//         <ul className="nav navbar-nav">
//           <li><Link to="/">Home</Link></li>
//         </ul>
//         <button className="btn btn-default navbar-btn">counter: {counter}</button>
//       </div>
//     </div>
//   </nav>
// );

export default NavBar;

import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
