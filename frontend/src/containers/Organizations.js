import * as Rx from 'rxjs';
import React, { Component, useCallback, useEffect, useMemo, } from 'react';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import { push } from 'connected-react-router';
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
import {
  selectOrganizationCreateActive,
  selectOrganizations,
} from '../selectors/organization.selectors';

export default () => {
  /*
  Redux dispatch hook
  */
  const dispatch = useDispatch();

  /*
  Selector Hooks, preferred pattern here is to use useMemo if props are being passed in
  these use useMemo for now as examples of how to achieve it.
  */
  const creating = useSelector(
    useMemo(() => selectOrganizationCreateActive),
  );
  const organizations = useSelector(
    useMemo(() => selectOrganizations),
  );

  /*
  React useEffect hook.
  The empty array passed into it forces it to only run on ComponentDidMount
  */
  useEffect(() => {
    dispatch(OrganizationActions.fetchOrganizations());
  }, [] /* ComponentDidMount */);

  /*
  Callback hooks to be passed to subcomponents,
  more than likely these use Redux hooks like dispatch = useDispatch()
  */
  const onSelected = useCallback(
    (_id) => {
      dispatch(OrganizationActions.selectOrganization({_id}));
      dispatch(push({url: `/organization/${_id}/games`, pathname:`/organization/${_id}/games`}));
    }, 
    [dispatch],
  );
  const onCreateNew = useCallback(
    () => {
      dispatch(OrganizationActions.createNewOrganization())
    },
    [dispatch],
  );
  const onCreate = useCallback(
    (values) => dispatch(OrganizationActions.saveNewOrganization(values)),
    [dispatch]
  );
  const onCancel = useCallback(
    () => {dispatch(OrganizationActions.cancelCreateNewOrganization())},
    [dispatch],
  );

  /*
  Render code
  this should come after all hooks are established especially if render code is conditional.
  */

  if (!organizations) {
    return (<></>);
  }

  let toolbar, content;
  if (!creating) {
    // toolbar = this.renderToolbar("Your Organizations");
    content = (
      <OrganizationList
        organizations={organizations}
        onSelected={onSelected}
        onCreateNew={onCreateNew}/>
    )
  } else {
    // toolbar = this.renderToolbar("Create Your Organization");
    content = (
      <OrganizationCreate
        onCreate={onCreate}
        onCancel={onCancel}
      />
    )
  }
  return (
    <main style={{marginTop: "12px"}}>
      {toolbar}
      {content}
    </main>
  )
}