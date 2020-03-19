import React, { useCallback, useEffect, useMemo, } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { push } from 'connected-react-router';
import PlayerInfo from '../components/PlayerInfo';
import PlayerList from '../components/PlayerList';
import PlayerCreate from '../components/PlayerCreate';
import * as PlayerActions from '../actions/PlayerActions';
import * as CharacterActions from '../actions/CharacterActions'
import {
  Button,
  Fab,
  TextField,
  TextFieldIcon,
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarMenuIcon,
  ToolbarTitle,
  ToolbarIcon,
  Theme,
  GridList,
  Grid,
  GridCell,
} from 'rmwc';
import { gameSelected, selectGame } from '../actions/GameActions';
import * as GameActions from '../actions/GameActions';
import * as OrganizationActions from '../actions/OrganizationActions';

import {
  selectOrganizations,
  selectSelectedOrganizationId,
} from '../selectors/organization.selectors';
import {
  selectGames,
  selectSelectedGameId,
} from '../selectors/game.selectors';
import {
  selectOrganizationIdParameter,
  selectGameIdParameter,
} from '../selectors/router.selectors';
import {
  selectPlayers,
  selectSelectedPlayerId,
  selectPlayerCreateActive,
  selectPlayerSearchFilter,
} from '../selectors/player.selectors';

export default () => {
  const dispatch = useDispatch();
  
  const creating = useSelector(
    useMemo(() => selectPlayerCreateActive),
  );

  const games = useSelector(
    useMemo(() => selectGames),
  );

  const organizationId = useSelector(
    useMemo(() => selectSelectedOrganizationId),
  );

  const gameId = useSelector(
    useMemo(() => selectSelectedGameId),
  )

  const players = useSelector(
    useMemo(() => selectPlayers),
  );

  const playerId = useSelector(
    useMemo(() => selectSelectedPlayerId),
  );

  const searchFilter = useSelector(
    useMemo(() => selectPlayerSearchFilter),
  );

  useEffect(() => {
    if (organizationId) {
      dispatch(GameActions.fetchGames({organizationId}));
    }
    if (gameId) {
      dispatch(PlayerActions.fetchPlayers({game_id: gameId}))
    }
  }, [organizationId, gameId]);

  /*
  Parse organization id from url
  should refactor this into a router.selectors.js file
  */
  
  const routeOrgId = useSelector(selectOrganizationIdParameter);
  const routeGameId = useSelector(selectGameIdParameter);
  const routePlayerId = useSelector(selectGameIdParameter);
  useEffect(() => {
    /*
    Restore state from url, i.e. hard refresh on page, or bookmarked page
    */
    if (!organizationId){
      dispatch(OrganizationActions.fetchOrganizations());
      dispatch(OrganizationActions.selectOrganization({_id: routeOrgId}));
    }

    if (!gameId && organizationId) {
      dispatch(GameActions.fetchGames({organizationId}));
      dispatch(GameActions.selectGame({_id: routeGameId}));
    }

    if (!playerId && gameId) {
      dispatch(PlayerActions.fetchPlayers({game_id: gameId}));
      dispatch(PlayerActions.selectPlayer({_id: routePlayerId}));
    }
    
  }, [organizationId, gameId, playerId]);

  const onClickNewButton = useCallback(
    () => dispatch(PlayerActions.createNewPlayer()),
    [dispatch],
  );

  const onSearch = useCallback(
    (searchFilter) => dispatch(PlayerActions.searchPlayers(searchFilter)),
    [dispatch],
  );

  const onCreatePlayer = useCallback(
    (values) => {
      values.organization = organizationId;
      values.game = gameId;
      dispatch(PlayerActions.saveNewPlayer(values));
    },
    [dispatch],
  );

  const onPlayerClick = useCallback(
    (playerId)=> {
      dispatch(PlayerActions.selectPlayer(playerId));
      dispatch(push({url: `/organization/${organizationId}/game/${gameId}/players/${playerId}`, pathname:`/organization/${organizationId}/game/${gameId}/players/${playerId}`}));
    },
    [dispatch],
  )

  const onCancelCreatePlayer = useCallback(
    () => {dispatch(PlayerActions.cancelCreateNewPlayer())},
    [dispatch],
  )

  const onCharacterClick = useCallback(
    (characterId)=> {
      dispatch(CharacterActions.selectCharacter(characterId))
      dispatch(push({url: `/organization/${organizationId}/game/${gameId}/player/${playerId}/characters/${characterId}`, pathname: `/organization/${organizationId}/game/${gameId}/player/${playerId}/characters/${characterId}`}))
    },
    [dispatch],
  )
  
  if (!players) {
    return (<></>);
  }

  console.log('playerId',playerId);

  let title, toolbar, toolbarActionButtons, content;
  if (!creating) {
    if(playerId){
      title = "Player View";
      const player = players.filter((player)=> player._id===playerId)[0]
      content = (<PlayerInfo
          player={player}
          onCharacterClick={onCharacterClick}
        ></PlayerInfo>
      );
      if (!player) {
        content = (<div>Player is missing for some reason from the data</div>);
      }
    } else {
      title = "View and Manage your Players";
      toolbarActionButtons = (
        <ToolbarSection alignStart>
          <Button
            theme={
              [
                'secondary-dark-bg',
                'text-secondary-on-light'
              ]
            }
            style={{
              marginRight: "10px",
            }}
            raised
            onClick={ onClickNewButton }
          >
            New
          </Button>
        </ToolbarSection>
      );
      content = (
        <section>
          <PlayerList
            players={players}
            onPlayerClick={onPlayerClick}
          />
        </section>
      );
    }
  } else {
    title = "Create Your Player";
    content = (
      <PlayerCreate
        onCreate={onCreatePlayer}
        onCancel={onCancelCreatePlayer}
      />
    )
  }
  toolbar = (
    (
      <Toolbar className="toolbar-content" style={{ backgroundColor: '#fff' }} theme={['primary', 'text-secondary-on-background']}>
        <ToolbarRow>
          <ToolbarSection alignStart>
            <ToolbarTitle>{title}</ToolbarTitle>
          </ToolbarSection>
          <ToolbarSection alignEnd>
            <TextField withLeadingIcon={<TextFieldIcon use="search"/>}  label="search" onChange={(e) => onSearch(e.target.value)} value={searchFilter}/>
          </ToolbarSection>
          {toolbarActionButtons}
        </ToolbarRow>
      </Toolbar>
    )
  )

  return (
    <main style={{marginTop: "16px"}}>
      {toolbar}
      {content}
    </main>
  );
}
