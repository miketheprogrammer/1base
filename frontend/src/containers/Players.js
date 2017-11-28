import React, { Component} from 'react';
import { connect } from 'react-redux';
import Rx from 'rxjs';
import PlayerInfo from '../components/PlayerInfo';
import PlayerList from '../components/PlayerList';
import * as PlayersActions from '../actions/PlayersActions';


class Players extends Component {

  constructor (props) {
    super(props);
    this.state = {
      selectedPlayer:{}
    };
    this.destroy$ = new Rx.Subject();
  }
  componentDidMount() {
    if (this.props.dispatch)
      this.props.dispatch(PlayersActions.fetchPlayers({game_id: this.props.selectedGame}));
    Rx.Observable
      .interval(1000)
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
      <div style={{float: 'left'}}>
        <PlayerList players={players}/>
      </div>
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
