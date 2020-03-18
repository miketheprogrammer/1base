import * as Rx from 'rxjs';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrganizationList from '../components/OrganizationList';
import OrganizationCreate from '../components/OrganizationCreate';
import * as OrganizationActions from '../actions/OrganizationActions';
import './CounterApp.css';
import logo from '../logo.svg';
import {
  Button,
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarMenuIcon,
  ToolbarTitle,
  ToolbarIcon,
  Theme,
  Fab,
} from 'rmwc';

class CounterApp extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.destroy$ = new Rx.Subject();
  }

  componentDidMount() {
    if (this.props.dispatch)
      this.props.dispatch(OrganizationActions.fetchOrganizations());
  }
  componentWillUnmount() {
    this.destroy$.next(null);
  }

  createOrganization(values) {
    this.props.dispatch(OrganizationActions.saveNewOrganization(values));
  }

  renderToolbar(title) {
    return (
      <Toolbar class="toolbar-content" style={{ backgroundColor: '#fff' }} theme={['primary', 'text-secondary-on-background']}>
        <ToolbarRow>
          <ToolbarSection alignStart>
            <ToolbarTitle>{title}</ToolbarTitle>
          </ToolbarSection>
        </ToolbarRow>
      </Toolbar>
    )
  }

  renderOrganizationList() {
    const { organizations, dispatch } = this.props;
    return (
      <OrganizationList
        organizations={organizations}
        onSelected={(_id) => {
          dispatch(OrganizationActions.selectOrganization({_id}));
        }}
        onCreateNew={() => {
          // this.setState({creatingNewOrganization: true});
          // console.log(this.state);
          this.props.dispatch(OrganizationActions.createNewOrganization())
        }}/>
    )
  }

  renderCreateNewOrganization() {
    const { organizations, dispatch } = this.props;
    return (
      <OrganizationCreate
        onCreate={(values) => this.createOrganization(values)}
        onCancel={() => {dispatch(OrganizationActions.cancelCreateNewOrganization())}}
      />
    )
  }

  render() {
    const { organizations, creating, dispatch } = this.props;
    let toolbar, content;
    if (!creating) {
      toolbar = this.renderToolbar("Your Organizations");
      content = this.renderOrganizationList();
    } else {
      toolbar = this.renderToolbar("Create Your Organization");
      content = this.renderCreateNewOrganization();
    }
    return (
      <main style={{marginTop: "12px"}}>
        {toolbar}
        {content}
      </main>
    )

  }

}
export default connect(state => ({
  organizations: state.organization.organizations || [],
  creating: Boolean(state.organization.creating),
}))(CounterApp);
