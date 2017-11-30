import React, { Component} from 'react';
import { connect } from 'react-redux';
import Rx from 'rxjs';
import PlayerInfo from '../components/PlayerInfo';
import PlayerList from '../components/PlayerList';
import * as PlayersActions from '../actions/PlayersActions';
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

class Players extends Component {

  constructor (props) {
    super(props);
    this.destroy$ = new Rx.Subject();
  }
  componentDidMount() {
    if (this.props.dispatch)
      this.props.dispatch(PlayersActions.fetchPlayers({game_id: this.props.selectedGame}));
    Rx.Observable
      .interval(1000 * 10)
      .takeUntil(this.destroy$)
      .subscribe(() => {
        if (this.props.dispatch) {
         this.props.dispatch(PlayersActions.fetchPlayers({game_id: this.props.selectedGame}));
       } else {
         console.warn('we dont have dispatch');
       }
      });
  }
  componentWillUnmount() {
    this.destroy$.next(null);
  }

  render () {
    const players = this.props.players;
    return (
      <main class="xmdc-theme--secondary-dark-bg" style={{marginTop: "16px"}}>
        <Toolbar class="toolbar-content" style={{ backgroundColor: '#fff' }} theme={['primary', 'text-secondary-on-background']}>
          <ToolbarRow>
            <ToolbarSection alignStart>
              <ToolbarTitle>Search and Manage Players</ToolbarTitle>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
        <PlayerList players={players}/>
      </main>
  );
  }
}

const mapStateToProps = state => {
  return {
    players: state.player.players || [],
    selectedGame: state.game.selected,
    selectedOrganization: state.organization.selected,
  };
};



export default connect(mapStateToProps)(Players);
