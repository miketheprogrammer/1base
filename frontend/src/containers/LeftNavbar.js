import React from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import * as OrganizationActions from '../actions/OrganizationActions';
import * as GameActions from '../actions/GameActions';

import {
  Button,
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarMenuIcon,
  ToolbarTitle,
  Theme,
  PermanentDrawer,
  PermanentDrawerContent,
  List,
  ListItem,
  ListItemText,
} from 'rmwc';
import './CounterApp.css';
// import 'material-components-web/dist/material-components-web.css'
import logo from '../logo.svg';

export class LeftNavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  render() {

    return (
        <PermanentDrawer theme={['secondary-dark-bg', 'text-secondary-on-dark']}>
        	<PermanentDrawerContent>
        		<List>
        			<ListItem>
        				<ListItemText>Dashboard</ListItemText>
        			</ListItem>
        			<ListItem>
        				<ListItemText>Players</ListItemText>
        			</ListItem>
              <ListItem>
                <ListItemText>DEBUG LINKS BELOW - </ListItemText>
              </ListItem>
              <ListItem onClick={() => this.props.dispatch(OrganizationActions.gotoOrganizationSelect())}>
                <ListItemText>Organizations</ListItemText>
              </ListItem>
              <ListItem onClick={() => this.props.dispatch(GameActions.gotoGameSelect())}>
                <ListItemText>Games</ListItemText>
              </ListItem>
        		</List>
        	</PermanentDrawerContent>
        </PermanentDrawer>

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
}))(LeftNavigationBar);
