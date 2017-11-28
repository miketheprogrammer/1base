import React from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {
  Button,
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarMenuIcon,
  ToolbarTitle,
  ToolbarIcon,
  Theme } from 'rmwc';
import './CounterApp.css';
import './Navbar.scss';
// import 'material-components-web/dist/material-components-web.css'
import logo from '../logo.svg';

export class NavigationBar extends React.Component {
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
        <Toolbar theme={['primary-dark-bg', 'text-primary-on-dark']} fixed>
          <ToolbarRow>
            <ToolbarSection alignStart>
              <ToolbarIcon use="cloud"/>
              <ToolbarTitle>1Base</ToolbarTitle>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
      </div>
    )
    // return (
    //   <div>
    //     <Navbar color="faded" light expand="md">
    //       <NavbarBrand href="/">reactstrap</NavbarBrand>
    //       <NavbarToggler onClick={this.toggle} />
    //       <Collapse isOpen={this.state.isOpen} navbar>
    //         <Nav className="ml-auto" navbar>
    //           <NavItem>
    //             <NavLink href="/components/">Components</NavLink>
    //           </NavItem>
    //           <NavItem>
    //             <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
    //           </NavItem>
    //         </Nav>
    //       </Collapse>
    //     </Navbar>
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <h1 className="App-title">Welcome to React</h1>
    //     </header>
    //   </div>
    // );
  }
}

export default connect(state => ({
}))(NavigationBar);
