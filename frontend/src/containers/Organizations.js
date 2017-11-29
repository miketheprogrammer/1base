import Rx from 'rxjs';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrganizationList from '../components/OrganizationList';
import * as OrganizationActions from '../actions/OrganizationActions';
import './CounterApp.css';
import logo from '../logo.svg';

class CounterApp extends Component {
  constructor(props){
    super(props);
    this.setState({});
    this.destroy$ = new Rx.Subject();
  }
  componentDidMount() {
    if (this.props.dispatch)
      this.props.dispatch(OrganizationActions.fetchOrganizations());
    Rx.Observable
      .interval(1000 * 10)
      .takeUntil(this.destroy$)
      .subscribe(() => {
        if (this.props.dispatch) {
         this.props.dispatch(OrganizationActions.fetchOrganizations());
       } else {
         console.warn('we dont have dispatch');
       }
      });
  }
  componentWillUnmount() {
    this.destroy$.next(null);
  }
  render() {
    const { organizations, dispatch } = this.props;
    console.log('orgs', organizations)
    return (
      <div style={{float: 'left'}}>
        <OrganizationList
          organizations={organizations}
          onSelected={(_id) => {
            dispatch(OrganizationActions.selectOrganization({_id}))
          }}/>
      </div>
    )

  }

}
export default connect(state => ({
  organizations: state.organization.organizations || []
}))(CounterApp);
