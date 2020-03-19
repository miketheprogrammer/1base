import React, { useCallback, useEffect, useMemo, } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { push } from 'connected-react-router';
import GameList from '../components/GameList';
import GameCreate from '../components/GameCreate';
import * as GameActions from '../actions/GameActions';
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
  Theme
} from 'rmwc';

import {
  selectSelectedOrganizationId,
} from '../selectors/organization.selectors';
import {
  selectGameCreateActive,
  selectGames,
} from '../selectors/game.selectors';
import {
  selectOrganizationIdParameter,
} from '../selectors/router.selectors';
import * as OrganizationActions from '../actions/OrganizationActions';

export default () => {
  const dispatch = useDispatch();
  
  const creating = useSelector(
    useMemo(() => selectGameCreateActive),
  );

  const games = useSelector(
    useMemo(() => selectGames),
  );

  const organizationId = useSelector(
    useMemo(() => selectSelectedOrganizationId),
  );

  useEffect(() => {
    if (organizationId) {
      dispatch(GameActions.fetchGames({organizationId}));
    }
  }, [organizationId]);

  /*
  Parse organization id from url
  should refactor this into a router.selectors.js file
  */
  
  const routeOrgId = useSelector(selectOrganizationIdParameter);
  useEffect(() => {
    /*
    Restore state from url, i.e. hard refresh on page, or bookmarked page
    */
    if (!organizationId){
      dispatch(OrganizationActions.fetchOrganizations());
      dispatch(OrganizationActions.selectOrganization({_id: routeOrgId}));
    }
  }, [organizationId]);

  const onSelected = useCallback(
    (_id) => {
      dispatch(GameActions.selectGame({_id}));
      dispatch(push({url: `/organization/${organizationId}/game/${_id}/players`, pathname: `/organization/${organizationId}/game/${_id}/players`}));
    }, 
    [dispatch],
  );
  const onCreateNew = useCallback(
    () => {
      dispatch(GameActions.createNewGame())
    },
    [dispatch],
  );
  const onCreate = useCallback(
    (values) => dispatch(GameActions.saveNewGame(values)),
    [dispatch]
  );
  const onCancel = useCallback(
    () => {dispatch(GameActions.cancelCreateNewGame())},
    [dispatch],
  );

  if (!games) {
    return (<></>);
  }

  let title;
  if (creating) {
    title = "Create a new Game";
  } else {
    title = "Your Games";
  }

  let toolbar, content;
  toolbar = (
    <Toolbar className="toolbar-content" style={{ backgroundColor: '#fff' }} theme={['primary', 'text-secondary-on-background']}>
      <ToolbarRow>
        <ToolbarSection alignStart>
          <ToolbarTitle>{title}</ToolbarTitle>
        </ToolbarSection>
      </ToolbarRow>
    </Toolbar>
  );
  if (!creating) {
    content = (
      <GameList
        games={games}
        onSelected={onSelected}
        onCreateNew={onCreateNew}/>
    )
  } else {
    content = (
      <GameCreate
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
