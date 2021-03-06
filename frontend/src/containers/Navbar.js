import React from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {logoutUser} from '../actions/UserActions'
import {
  Button,
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarMenuIcon,
  ToolbarTitle,
  ToolbarIcon,
  Theme,
  TopAppBar,
  TopAppBarActionItem,
  TopAppBarFixedAdjust,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarRow,
} from 'rmwc';
import './CounterApp.css';
import './Navbar.scss';
import logo from '../logo.svg';
import '@material/toolbar/dist/mdc.toolbar.css';

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
    const {dispatch} = this.props;
    return (
      <>
        <TopAppBar fixed>
          <TopAppBarRow>
            <TopAppBarSection alignStart>
              <TopAppBarActionItem icon="cloud" />
              <TopAppBarTitle>1Base</TopAppBarTitle>
            </TopAppBarSection>
            <TopAppBarSection alignEnd>
              <TopAppBarActionItem icon="star" />
              <TopAppBarActionItem icon="mood" />
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
        <TopAppBarFixedAdjust />
      </>
      // <div>
      //   <Toolbar theme={['primaryBg', 'textPrimaryOnDark']} fixed>
      //     <ToolbarRow>
      //       <ToolbarSection alignStart>
      //         <ToolbarIcon use="cloud"/>
      //         <ToolbarTitle>1Base</ToolbarTitle>
      //       </ToolbarSection>
      //       <ToolbarSection alignEnd>
      //         <ToolbarTitle onClick={() => dispatch(logoutUser())}>logout</ToolbarTitle>
      //       </ToolbarSection>
      //     </ToolbarRow>
      //   </Toolbar>
      // </div>
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
