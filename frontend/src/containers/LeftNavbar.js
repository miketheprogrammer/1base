import React from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { push } from 'connected-react-router';
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
  Drawer,
  DrawerContent,
  Icon,
  List,
  ListItem,
  ListItemText,
  ListItemGraphic,
  ListItemMeta,
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
    const {dispatch} = this.props;
    return (
        <Drawer theme={['primary-dark-bg']}>
        	<DrawerContent>
        		<List theme={['text-primary-on-dark']}>
        			<ListItem onClick={() => dispatch(push({pathname: '/dashboard'}))}>
        				<ListItemText>Dashboard</ListItemText>
                <ListItemMeta>
                  <Icon>home</Icon>
                </ListItemMeta>
        			</ListItem>
        			<ListItem onClick={() => dispatch(push({pathname: '/players'}))}>
        				<ListItemText>Players</ListItemText>
                <ListItemMeta>
                  <Icon>group</Icon>
                </ListItemMeta>
        			</ListItem>
              <ListItem onClick={() => dispatch(push({pathname: '/items'}))}>
        				<ListItemText>Items</ListItemText>
                <ListItemMeta>
                  <Icon>group</Icon>
                </ListItemMeta>
        			</ListItem>
              <ListItem onClick={() => this.props.dispatch(OrganizationActions.gotoOrganizationSelect())}>
                <ListItemText>Organizations</ListItemText>
                <ListItemMeta>
                  <Icon>location_city</Icon>
                </ListItemMeta>
              </ListItem>
              <ListItem onClick={() => this.props.dispatch(GameActions.gotoGameSelect())}>
                <ListItemText>Games</ListItemText>
                <ListItemMeta>
                  <Icon>extension</Icon>
                </ListItemMeta>
              </ListItem>
        		</List>
        	</DrawerContent>
        </Drawer>

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
