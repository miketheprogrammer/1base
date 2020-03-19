import React, { Component} from 'react';
import { connect } from 'react-redux';
import * as Rx from 'rxjs';
import { push } from 'connected-react-router';
import PlayerInfo from '../components/PlayerInfo';
import PlayerList from '../components/PlayerList';
import PlayerCreate from '../components/PlayerCreate';
import RequestTimesChart from '../components/charts/RequestTimesChart';
import ChartCard from '../components/ChartCard';
import SingleStat from '../components/charts/SingleStat';
import HoverElevation from '../components/HoverElevation';
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
import { gameSelected } from '../actions/GameActions';

class Players extends Component {

  constructor (props) {
    super(props);
    this.destroy$ = new Rx.Subject();
  }
  componentDidMount() {
    if (this.props.dispatch)
      this.props.dispatch(PlayerActions.fetchPlayers({game_id: this.props.selectedGame}));
  }
  componentWillUnmount() {
    this.destroy$.next(null);
  }

  createPlayer(values) {
    values.organization = this.props.selectedOrganization;
    values.game = this.props.selectedGame;
    this.props.dispatch(PlayerActions.saveNewPlayer(values));
  }

  renderToolbarActionButtons() {
    const {dispatch} = this.props;
    return (
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
        onClick={() => {dispatch(PlayerActions.createNewPlayer())}}
      >New</Button>
      </ToolbarSection>
    )
  }

  search(searchFilter) {
    const {dispatch} = this.props;
    dispatch(PlayerActions.searchPlayers(searchFilter))
  }

  renderToolbar(title, includeActionButtons) {
    const {dispatch, searchFilter} = this.props;
    let actionButtons;
    if (includeActionButtons)
      actionButtons = this.renderToolbarActionButtons()
    return (
      <Toolbar class="toolbar-content" style={{ backgroundColor: '#fff' }} theme={['primary', 'text-secondary-on-background']}>
        <ToolbarRow>
          <ToolbarSection alignStart>
            <ToolbarTitle>{title}</ToolbarTitle>
          </ToolbarSection>
          <ToolbarSection alignEnd>
            <TextField withLeadingIcon={<TextFieldIcon use="search"/>}  label="search" onChange={(e) => this.search(e.target.value)} value={searchFilter}/>
          </ToolbarSection>
          {actionButtons}
        </ToolbarRow>
      </Toolbar>
    )
  }

  renderPlayerList() {
    const {selectedGame, selectedOrganization, players, dispatch} = this.props;
    return (
      <section>
        <PlayerList
          players={players}
          onPlayerClick={(playerId)=> {
            dispatch(PlayerActions.selectPlayer(playerId));
            dispatch(push({url: `/organization/${selectedOrganization}/game/${selectedGame}/players/${playerId}`, pathname:`/organization/${selectedOrganization}/game/${selectedGame}/players/${playerId}`}));
          }}
        />
      </section>
    )
  }

  renderCreateNewPlayer() {
    const {players, dispatch} = this.props;
    return (
      <PlayerCreate
        onCreate={(values) => this.createPlayer(values)}
        onCancel={() => {dispatch(PlayerActions.cancelCreateNewPlayer())}}
      />
    )
  }

  renderViewPlayer(){
    const { selectedGame, selectedOrganization, players, dispatch, selection}=this.props;
    const player = players.filter((player)=> player._id===selection)[0]
    if (!player) {
      return (<div>Player is missing for some reason from the data</div>)
    }
    return (
      <PlayerInfo
        player={player}
        onCharacterClick={(characterId)=> {
          dispatch(CharacterActions.selectCharacter(characterId))
          dispatch(push({url: `/organization/${selectedOrganization}/game/${selectedGame}/player/${selection}/characters/${characterId}`, pathname: `/organization/${selectedOrganization}/game/${selectedGame}/player/${selection}/characters/${characterId}`}))
        }}
      />

    )
  }

  render () {
    const {
      players,
      creating,
      dispatch,
      selection,
      selectedGame,
      selectedOrganization
    } = this.props;
    let toolbar, content;
    console.log('Player Props', this.props)
    if (!creating) {
      if(selection){
        toolbar= this.renderToolbar("Player View")
        content = this.renderViewPlayer();
      } else {
        toolbar = this.renderToolbar("View and Manage your Players", true);
        content = this.renderPlayerList();
      }
    } else {
      toolbar = this.renderToolbar("Create Your Player");
      content = this.renderCreateNewPlayer();
    }
    return (
      <main style={{marginTop: "16px"}}>
        {toolbar}
        {content}
      </main>
  );
  }
}

const mapStateToProps = state => {
  return {
    players: state.player.players || [],
    selectedGame: state.game.selected,
    selectedOrganization: state.organization.selected,
    creating: state.player.creating,
    selection: state.player.selection,
    searchFilter: state.player.searchFilter,
  };
};



export default connect(mapStateToProps)(Players);
